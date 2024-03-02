const cheerio = require("cheerio");

exports.listings = (html) => {
  const $ = cheerio.load(html);

  return $(".cl-static-search-result")
    .map((index, element) => {
      const resultTitle = $(element).find(".title");
      const title = resultTitle.text();
      const url = $(element).find("a").attr("href");

      // const scrapeResult = { title, url };

      return { title, url };
    })
    .get();
};
