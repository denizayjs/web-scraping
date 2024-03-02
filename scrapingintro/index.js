const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

async function main() {
  const html = await request.get(
    "https://reactnativetutorial.net/lesson2.html"
  );

  fs.writeFileSync("./test.html", html);

  const $ = cheerio.load(html);
  $("h2").each((index, element) => {
    console.log($(element).text());
  });
}

main();
