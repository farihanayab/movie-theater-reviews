const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const review = require('./review').schema;
const detailSchema = new Schema ({
	theaterDetails: String,
	theaterLocation: String,
	reviews: [review],
	rating: {
		type: String,
		enum: ["1", "2", "3", "4", "5"]
	},
})
const theaterSchema = new Schema({
	theaterName: String,
	rating: String,
	details: [detailSchema] },
	{ timestamps: true,
});

module.exports = mongoose.model('theater', theaterSchema);