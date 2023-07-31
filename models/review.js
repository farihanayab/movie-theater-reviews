const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user')

const reviewSchema = new Schema(
	{
		
		review: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
