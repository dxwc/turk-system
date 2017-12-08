const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define bid child schema
const ratingSchema = Schema({
  // developer id
  fromUserId: Schema.Types.ObjectId,
  toUserId: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId,
  ratingText: { type: String, default: '' },
  rating: { type: Number, default: 1 }
});

module.exports = mongoose.model('Rating', ratingSchema);
