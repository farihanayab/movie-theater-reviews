const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// create a review
router.post('/', reviewsCtrl.create)

// // get the review
// router.get('/theater/reviews/:id', reviewsCtrl.getReviews);

// // update the review
// router.put('theater/reviews/:id', reviewsCtrl.editREview);

// // delete the review 
// router.delete('theter/reviews/:id', reviewsCtrl.deleteReview)


module.exports = router;