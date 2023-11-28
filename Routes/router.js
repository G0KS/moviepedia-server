const express = require("express");

const tmdbController = require("../Controllers/tmdbController");
const userController = require("../Controllers/userController");
const movieController = require("../Controllers/movieController");

const multerMiddleware = require("../Middlewares/multerMiddleware");

const router = new express.Router();

router.get("/get", tmdbController.getAllMoviesOrShows);

router.get("/search", tmdbController.searchMoviesOrShows);

router.get("/view/:id", tmdbController.getMovieOrShow);

router.get("/videos/:id", tmdbController.getVideos);

router.post(
   "/users/register",
   multerMiddleware.single("profile"),
   userController.register
);

router.post("/users/login", userController.login);

router.delete("/users/delete/:id", userController.deleteUser);

router.post("/user/favorites/add/:id", userController.addFavorite);

router.get("/user/favorites", userController.getAllFavorites);

router.put("/user/favorites/update/:id", userController.updateFavorites);

router.post("/movies/reviews/add/:id", movieController.addReview);

router.get("/movies/reviews/:id",movieController.getAllReviews)

module.exports = router;
