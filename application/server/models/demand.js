const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define bid child schema
const bidSchema = Schema({
  userId: Schema.Types.ObjectId,
  email: String,
  name: String,
  amount: Number,
  promisedTimeline: String
});

// define the schema for demand model
const demandSchema = Schema({
  // ##########
  // !!!!
  // maybe put id of client who posted demand here
  spec: String,
  biddingTimeline: String,
  bids: [bidSchema]
});

// create the model for demand and expose it to our app
module.exports = mongoose.model('Demand', demandSchema);
