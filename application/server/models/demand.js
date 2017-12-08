const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define bid child schema
const bidSchema = Schema({
  // developer id
  userId: Schema.Types.ObjectId,
  email: String,
  name: String,
  bidAmount: Number,
  promisedTimeline: String,
  isLowestBid: { type: Boolean, default: false },
  // bidStatus can be: normal, inReview, accepted
  bidStatus: { type: String, default: 'normal' },
  justification: String
});

// define the schema for demand model
const demandSchema = Schema({
  clientID: Schema.Types.ObjectId,
  spec: String,
  biddingTimeline: String,
  bids: [bidSchema],
  demandStatus: String,
});

// create the model for demand and expose it to our app
module.exports = mongoose.model('Demand', demandSchema);
