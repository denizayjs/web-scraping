const request = require("request-promise");
const ObjectsToCsv = require("objects-to-csv");
// .defaults({
//   proxy: "67.43.236.20:18129",
// });
const cheerio = require("cheerio");

const url = "https://sfbay.craigslist.org/search/sof";

const scrapeResults = [];

async function createCsvFile(data) {
  const csv = new ObjectsToCsv(data);

  // Save to file:
  await csv.toDisk("./test.csv");
}

async function scrapeCraigslist() {
  try {
    const html = await request.get(url);

    const $ = await cheerio.load(html);

    $(".cl-static-search-result").each((index, element) => {
      const resultTitle = $(element).find(".title");
      const title = resultTitle.text();
      const url = $(element).find("a").attr("href");

      const scrapeResult = { title, url };
      scrapeResults.push(scrapeResult);
    });

    createCsvFile(scrapeResults);
  } catch (error) {
    console.log(error);
  }
}

scrapeCraigslist();

// use requestretry library if internet connection is bad
