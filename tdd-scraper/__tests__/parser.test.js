const parser = require("../parser");
const fs = require("fs");

let html;
let listings;

beforeAll(() => {
  html = fs.readFileSync("./test.html");
  listings = parser.listings(html);
});

// const listings = [
//   {
//     title: "Web Designers/Graphic Designer Wanted to re-design Homepage",
//     url: "https://sfbay.craigslist.org/sfc/sof/d/san-francisco-web-designers-graphic/7702389609.html",
//   },
// ];

it("should give the correct number of listings", () => {
  expect(listings.length).toBe(15);
});

it("should get correct title", () => {
  expect(listings[0].title).toBe(
    "Web Designers/Graphic Designer Wanted to re-design Homepage"
  );
});

it("should get correct url", () => {
  expect(listings[0].url).toBe(
    "https://sfbay.craigslist.org/sfc/sof/d/san-francisco-web-designers-graphic/7702389609.html"
  );
});

// it("should give 4", () => {
//   const result = parser.add(2, 2);

//   expect(result).toBe(4);
// });
