 const theater = require('../models/theater');

module.exports = {
  create,
  index,
  new : newReview,
  show
};
async function index(req, res) {
  const theaters = await theater.find ({})
  console.log(theaters)
  res.render('theater/index' , {theaters, title: ''})

}
async function create(req, res) {
  const movie = await theater.findById(req.params.id);
  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

 console.log(req.body);
  try {
    await theater.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/theaters`);
}

function newReview(req, res) {
  res.render('theater/new', { title: 'Add Review', errorMsg: '' });
}
async function show(req, res) {
  const theater = await theater.findById(req.params.id).populate('cast');
  res.render('theater/show', { title: 'Theater Detail', theater });
}