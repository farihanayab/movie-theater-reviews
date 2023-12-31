const express = require('express');
const router = express.Router();

// const router = require('express').Router();
const passport = require('passport');
const {profile} = require ('console')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title:'theaters' });
});


router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
  }
));
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/theaters',
    failureRedirect: '/theaters'
  }
));
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    scope: ['profile', 'email'],
  }
));
// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/theaters');
  });
});


module.exports = router;

