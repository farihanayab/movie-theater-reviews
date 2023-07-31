const express = require('express');
const router = express.Router();
const theatersCtrl = require('../controllers/theaters.js');
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', theatersCtrl.index);
router.get('/new', theatersCtrl.newTheater);
router.put('/:id', theatersCtrl.updateTheater)
// POST /movies/:id/reviews (create review for a theater)
router.post('/create', theatersCtrl.create);
// router.get('/theaters',reviewsCtrl.create )

//Use ensureLoggedIn middleware to protect routes
router.get('/new', ensureLoggedIn, theatersCtrl.newTheater); 

router.get('/:id/edit', theatersCtrl.editTheater);

router.delete('/:id', ensureLoggedIn, theatersCtrl.deleteTheater); 

// show the theater details 
router.get('/:id', theatersCtrl.show);

// add a review for individual theater
router.get('/:id/add-review', theatersCtrl.newReview)
router.post(':id/add-review', theatersCtrl.addReviewOne)



module.exports = router;