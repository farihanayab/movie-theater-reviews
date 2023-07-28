
// require theater model
const Review = require('../models/review');
const Theater = require('../models/theater');

// CREATE
async function create(req, res, next) {
//   console.log("In the create function!")
//   console.log("Req: " + req)
//   console.log("Res: " + res)
  try {
    console.log("In the try function!")
    req.body.user = req.user._id;
    const review = await Review.create(req.body);
    const theaterId = req.body.theaterId;
    const theater = await Theater.findById(theaterId);
    if (theater) {
      theater.reviews.push(review._id);
      await theater.save();
      console.log(theater)
    }
    // redirect the user to their review (create the view)
    // console.log("About to redirect!")
    res.redirect('/theaters');
  } catch (error) {
    next(error);
  }
}


  



module.exports = {
  create,
//   getReviews,
//   editReview,
//   deleteReview,
};


