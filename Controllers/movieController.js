const movies = require("../Models/movieSchema");

exports.addReview = async (req, res) => {
   const { id } = req.params;
   const { review } = req.body;
   console.log(id, review);
   try {
      const existing = await movies.findOne({ id });
      if (existing) {
         existing.reviews.push(review);
         res.status(200).json(existing);
      } else {
         const newReview = new movies({
            id,
            reviews: review,
         });
         await newReview.save();
         res.status(200).json(newReview);
      }
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.getAllReviews = async (req,res) =>{
   const {id} = req.params
   try {
      const response = await movies.findOne({id})
      res.status(200).json(response)
   } catch (error) {
      res.status(401).json(error);
      
   }
}