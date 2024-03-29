const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Listing = require('./model/Listing');
require('dotenv').config();
//craigslistuser
async function connectToMongoDb() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('connected to mongodb');
}

async function scrapeListings(page) {
  await page.goto('https://sfbay.craigslist.org/search/sof', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector('.posting-title');

  const html = await page.content();
  const $ = cheerio.load(html);

  const listings = $('.cl-search-result')
    .map((index, element) => {
      const titleElement = $(element).find('.posting-title');

      const timeElement = $(element).find('.meta > [title]');
      const datePosted = new Date($(timeElement).attr('title'));

      const title = titleElement.text();
      const url = titleElement.attr('href');
      return { title, url, datePosted };
    })
    .get(); // if use map, ypu can use get() for actual value
  return listings;
}

async function scrapeJobDescriptions(listings, page) {
  for (let i = 0; i < listings.length; i++) {
    await page.goto(listings[i].url);
    await page.waitForSelector('#postingbody');
    const html = await page.content();

    const $ = cheerio.load(html);
    const jobDescription = $('#postingbody').text();
    const compensation = $('p.attrgroup > span:nth-child(1) > b').text();
    listings[i].jobDescription = jobDescription;
    listings[i].compensation = compensation;
    const listingModel = new Listing(listings[i]);
    await listingModel.save();
    await sleep(1000); // 1 second delay
  }

  return listings;
}

async function sleep(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

async function main() {
  await connectToMongoDb();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const listings = await scrapeListings(page);

  const listingsWithJobDescriptions = await scrapeJobDescriptions(
    listings,
    page,
  );

  console.log(listingsWithJobDescriptions);

  browser.close();
}

main();
