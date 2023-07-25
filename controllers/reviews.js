 const theater = require('../models/theater');

module.exports = {
  create
};

async function create(req, res) {
  const movie = await theater.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
 theater.reviews.push(req.body);
  try {
    // Save any changes made to the movie doc
    await movie.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/theater/${theater._id}`);
}