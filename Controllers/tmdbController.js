const axios = require("axios");

const api_key = process.env.api_key;
const api_token = process.env.api_token;

const commonRequest = async (url, params) => {
   let config = {
      method: "GET",
      url: `https://api.themoviedb.org/3${url}`,
      params: { ...params, api_key },
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${api_token}`,
      },
   };
   return await axios(config)
      .then((data) => {
         return data;
      })
      .catch((err) => {
         return err;
      });
};

const category = {
   movie: "movie",
   tv: "tv",
};

const movieType = {
   upcoming: "upcoming",
   popular: "popular",
   top_rated: "top_rated",
};

const tvType = {
   popular: "popular",
   top_rated: "top_rated",
   on_the_air: "on_the_air",
};

exports.getAllMoviesOrShows = async (req, res) => {
   const type = req.query.type;
   try {
      const response = await commonRequest(`/discover/${category[type]}`);
      res.status(200).json(response.data);
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.searchMoviesOrShows = async (req, res) => {
   const { query } = req.query;
   try {
      const response = await commonRequest(`/search/multi?query=${query}`);
      res.status(200).json(response.data);
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.getMovieOrShow = async (req, res) => {
   const { id } = req.params;
   const { type } = req.query;
   try {
      const response = await commonRequest(`/${category[type]}/${id}`);
      res.status(200).json(response.data);
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.getVideos = async (req, res) => {
   const { id } = req.params;
   const { type } = req.query;
   try {
      const response = await commonRequest(`/${category[type]}/${id}/videos`);
      res.status(200).json(response.data);
   } catch (error) {
      res.status(401).json(error);
   }
};
