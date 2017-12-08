const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
const userSchema = Schema({
  local: {
    email: String,
    password: String,
    usertype: String,
    realname: String,
    // Use deposit for amount
    deposit: { type: Number, default: 0 },
    accountStatus: String,
    warningCounter: { type: Number, default: 0 },
    rejectMessage: { type: String, default: '' },
    avgRating: {type: Number, default:0 },
    developerDetails: {
      resume: { type: String, default: '' },
      picture: { type: String, default: '' },
      interests: { type: String, default: '' },
      samplework: { type: String, default: '' },
      // dev's bids
      bidDemandIds: [Schema.Types.ObjectId]
    },
    clientDetails: {
      picture: { type: String, default: '' },
      interests: { type: String, default: '' },
      businessCredentials: { type: String, default: '' },
      postedDemandIds: { type: [Schema.Types.ObjectId], default: [] },
    }
  }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
