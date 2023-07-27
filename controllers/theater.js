 const theater = require('../models/theaters');

module.exports = {
  create,
  index,
  new : newReview,
  show
};
async function index(req, res) {
  const theaters = await theater.find ({})
  res.render('theater/index' , {theaters, title: ''})

}
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
function newReview(req, res) {
  // We'll want to be able to render an 
  // errorMsg if the create action fails
  res.render('theater/new', { title: 'Add Review', errorMsg: '' });
}
async function show(req, res) {
  const theater = await theater.findById(req.params.id).populate('cast');
  res.render('theater/show', { title: 'Theater Detail', theater });
}