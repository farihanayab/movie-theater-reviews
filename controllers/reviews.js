// controllers/reviewsCtrl.js

// require theater model
const Review = require('../models/review');
const Theater = require('../models/theater');
const reviewsCtrl = require('../controllers/reviews');

// CREATE
async function create(req, res, next) {
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

// // Show a specific review using its ID
// exports.show = (req, res) => {
//     const reviewsId= req.params.id;

// };



// SHOW
// GET /:id
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	review.findById(id)
		.then((getreview) => res.json(getreview))
		.catch(next);
});

module.exports = {
  create,
  show,
// getReviews,
//   editReview,
//   deleteReview,
};












































