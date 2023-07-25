const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /movies/:id/reviews (create review for a movie)
router.post('/theaters/:id/reviews', reviewsCtrl.create);

router.get('/', moviesCtrl.index);
// Use ensureLoggedIn middleware to protect routes
router.get('/new', ensureLoggedIn, moviesCtrl.new);
router.get('/:id', moviesCtrl.show);
router.post('/', ensureLoggedIn, moviesCtrl.create);

module.exports = router;