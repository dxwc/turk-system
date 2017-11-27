const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define bid child schema
const bidSchema = Schema({
  userId: Schema.Types.ObjectId,
  email: String,
  name: String,
  bidAmount: Number,
  promisedTimeline: String,
  isLowestBid: { type: Boolean, default: false }
});

// define the schema for demand model
const demandSchema = Schema({
  clientID: Schema.Types.ObjectId,
  spec: String,
  biddingTimeline: String,
  bids: [bidSchema]
});

// create the model for demand and expose it to our app
module.exports = mongoose.model('Demand', demandSchema);
