// controllers/reviewsCtrl.js
const express = require('express');
const router = express.Router();

// require theater model
const Review = require('../models/review');
const Theater = require('../models/theater');
const reviewsCtrl = require('../controllers/reviews');


async function addReview(req, res, next) {
  res.render('theaters/addReview')
}

// CREATE
async function create(req, res, next) {
  try {
    req.body.user = req.user._id;
    const review = await Review.create(req.body);
    const theaterId = req.body.theaterId;
    const theater = await Theater.findById(theaterId);
    // Create the review
    const newReview = new Review({ title, review, rating, user });
    theater.theaterReviews.push(newReview);
    console.log(theater)
    await foundTheater.save();
    res.redirect('/theaters');
  } catch (error) {
    next(error);
  }
}

/// DELETE
async function deleteReview(req, res, next) {
	try {
	  const reviewId = req.params.id;
  
	  // Find the review to be deleted
	  const review = await Review.findById(reviewId);
	  if (!review) {
	// 	// If the review with the given ID is not found, return an error
	// 	return res.status(404).json({ error: 'Review not found' });
	 }
  
	  // Find the theater associated with this review
	  const theater = await Theater.findById(review.theaterId);
  
	  if (!theater) {
		// If the theater associated with the review is not found, return an error
		return res.status(404).json({ error: 'Theater not found' });
	  }
  
	  // Remove the review ID from the theater's reviews array
	  theater.reviews.pull(reviewId);
	  await theater.save();
  
	  // Delete the review from the database
	  await review.remove();
  
	  res.status(200).json({ message: 'Review deleted successfully' });
	} catch (error) {
	  next(error);
	}
}
  
// UPDATE
async function updateReview(req, res, next) {
	try {
	  const reviewId = req.params.id;
	  const updateData = req.body;
  
	  // Find the review to be updated
	  const review = await Review.findById(reviewId);
	  if (!review) {
		// If the review with the given ID is not found, return an error
		return res.status(404).json({ error: 'Review not found' });
	  }
  
	  // Update the review data
	  review.title = updateData.title || review.title;
	  review.content = updateData.content || review.content;
	  // Add more fields that you want to update
  
	  // Save the updated review to the database
	  await review.save();
  
	  res.status(200).json({ message: 'Review updated successfully', review });
	} catch (error) {
	  next(error);
	}
  }

 



module.exports = {
  create,
  updateReview,
  deleteReview,
  addReview
}



































