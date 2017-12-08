const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema for demand model
const protestSchema = Schema({
  userId: Schema.Types.ObjectId,
  protestMessage: String
});

// create the model for demand and expose it to our app
module.exports = mongoose.model('Protest', protestSchema);