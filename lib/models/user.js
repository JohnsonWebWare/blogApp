const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var userSchema = mongoose.Schema({
  _profileVersion: String,
  rank: Number,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  facebookId: String,
  facebookToken: String,
  email: String,
  firstName: String,
  lastName: String,
  gender: String,
  picture: String,
  link: String

});

module.exports = mongoose.model('User', userSchema);