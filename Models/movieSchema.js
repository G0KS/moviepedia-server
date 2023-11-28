const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
   id: {
      type: Number,
      required: true,
   },
   reviews: {
      type: Array,
      required: true,
   },
});

const movies = mongoose.model("movies", movieSchema);

module.exports = movies;
