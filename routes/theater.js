const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/theater');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /movies/:id/reviews (create review for a theater)
router.post('/theaters/:id/reviews', reviewsCtrl.create);
router.get('/theaters',reviewsCtrl.create )

router.get('/', reviewsCtrl.index);
//Use ensureLoggedIn middleware to protect routes
router.get('/new', ensureLoggedIn, reviewsCtrl.new); 
// router.get('/:id', reviewsCtrl.show);


   
module.exports = router;