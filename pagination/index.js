const request = require('request-promise');
const cheerio = require('cheerio');

async function scrape() {
  for (let index = 0; index < 11; index++) {
    const html = await request.get(
      `https://dallas.craigslist.org/search/trp#search=1~list~${index}~0`,
    );

    const $ = await cheerio.load(html);

    $('.cl-static-search-result').each((index, element) => {
      const title = $(element).find('.title').text();
      console.log(title);
    });

    console.log('At page number: ' + index);
  }
}
scrape();
