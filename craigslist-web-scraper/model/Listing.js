const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  url: String,
  datePosted: Date,
  jobDescription: String,
  compensation: String,
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
