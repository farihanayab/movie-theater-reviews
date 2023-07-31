const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.get('/add-review/:id', reviewsCtrl.addReview)
// create a review
router.post('/:id', reviewsCtrl.create)


// // update the review
router.put('theater/reviews/:id', reviewsCtrl.updateReview);

// // delete the review 
router.delete('theater/reviews/:id', reviewsCtrl.deleteReview)




module.exports = router;
