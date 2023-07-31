const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const review = require('./review').schema;

const theaterSchema = new Schema(
	{
		theaterName: String,
		theaterLocation: String,
		theaterReviews: [review],
		title: String,
		user: String,
		rating: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('theater', theaterSchema);
