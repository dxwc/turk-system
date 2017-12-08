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
  demandStatus: { type: String, default: 'open' },
  contractedDevId: Schema.Types.ObjectId,
  finalAcceptedBidAmount: Number
});

// create the model for demand and expose it to our app
module.exports = mongoose.model('Demand', demandSchema);
//module.exports = mongoose.model('Bid', bidSchema);