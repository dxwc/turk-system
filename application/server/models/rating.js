const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define bid child schema
const ratingSchema = Schema({
  // developer id
  fromUserId: Schema.Types.ObjectId,
  toUserId: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId,
  time: new Date(),
  ratingType: { type: String, default: '' },
  rating: { 
      type: Number, 
      default: 1, 
      validate: {
        validator: function (value) {
          return [1, 2, 3, 4, 5].indexOf(value) !== -1;
        },
        message: 'Value must be one of from 1 to 5'
      } 
  }
});

module.exports = mongoose.model('Rating', ratingSchema);
