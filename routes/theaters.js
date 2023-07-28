const express = require('express');
const router = express.Router();
const theatersCtrl = require('../controllers/theaters');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', theatersCtrl.index);
// POST /movies/:id/reviews (create review for a theater)
router.post('/create', theatersCtrl.create);
// router.get('/theaters',reviewsCtrl.create )


//Use ensureLoggedIn middleware to protect routes
router.get('/new', ensureLoggedIn, theatersCtrl.new); 
// router.get('/:id', reviewsCtrl.show);


   
module.exports = router;