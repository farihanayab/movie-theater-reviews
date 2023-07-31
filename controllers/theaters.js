const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;

const Theater = require('../models/theater');
const Review = require('../models/review')

async function index(req, res) {
  const theaters = await Theater.find ({})
  console.log(theaters)
  res.render('theater/index' , {theaters, title: ''})

}

// add a brand new theater and review
async function newReview(req, res) {
  res.render('theater/new', { title: 'Add Review', errorMsg: '' });
}
// add one review to a theater
async function addReview(req, res) {
  const theater = await Theater.findById(req.params.id);
    res.render('theater/add-review', { theater });
}

async function addReviewOne(req, res) {
  const theaterId = req.params.id;
  const { review } = req.body;
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }
    // Add the review to the theater's theaterReviews array
    theater.theaterReviews.push({ review });
    await theater.save();

    res.redirect(`/theaters/${theaterId}`);

}

async function show(req, res) {
  const target = await Theater.findById(req.params.id)
  res.render('theater/show', { title: 'Theater Detail', theater: target});
}


async function deleteTheater(req, res) {
  const theaterId = req.params.id;
  const deletedTheater = await Theater.findByIdAndRemove(theaterId);
  res.redirect('/theaters')
}

async function editTheater(req, res) {
  const theaterId = req.params.id;

  try {
    // Find the theater by ID
    const targetTheater = await Theater.findById(theaterId);

    if (!targetTheater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    return res.render('theater/editTheater', { theater: targetTheater });
  } catch (err) {
    console.error('Error finding theater:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateTheater(req, res) {
  const theaterId = req.params.id;
  const updatedTheaterData = req.body;
  console.log(updatedTheaterData);
  try { 
    const updatedTheater = await Theater.findByIdAndUpdate(theaterId, updatedTheaterData, { new: true });

    if (!updatedTheater) {
      return res.status(404).json({ error: 'Theater not found' });
    }
    res.redirect(`/theaters`);
  } catch (err) {
    console.error('Error updating theater:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function newTheater(req, res) {
  try { 
    const target = await Theater.find({});
    res.render('theater/new', { title: 'Add Theater Review', errorMsg: '', theaters: target });
  } catch (err) {
    console.error('Error fetching theaters:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function create(req, res) {
  try {
    const { newTheaterName, newTheaterLocation, user, title, rating, review } = req.body;

    // Create a new theater and save it to the database
    const newTheater = new Theater({
      theaterName: newTheaterName,
      theaterLocation: newTheaterLocation,
      theaterReviews: [],
    });
    await newTheater.save();

    // Create a new review
    const newReview = new Review({ title, review, rating, user });
    newTheater.theaterReviews.push(newReview);
    await newTheater.save();
    res.redirect('/theaters')
  } catch (err) {
    console.error('Error adding review:', err);
    res.redirect('/theaters')
  }
}

module.exports = {
  create,
  index,
  newReview,
  show, 
  deleteTheater,
  editTheater,
  updateTheater,
  newTheater,
  addReview,
  addReviewOne,
}