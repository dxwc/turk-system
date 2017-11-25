const mongoose = require('mongoose');
let Users = require('../models/user.js');

// Update user info with more details right after user is accepted
// mongoose.Types is needed to convert string id to mongoose id
const updateUser = (req, res) => {
  Users
    .findOne({ '_id':  req.user.id })
    .exec(function(err, user) {
      if (err) { throw err; }
      else if (user) {
        user.local.accountStatus = 'normal';

        const details = req.body;
        // update user document with user details
        // check if usertype is developer or client
        if (req.user.local.usertype === 'developer') {
          user.local.developerDetails.resume = details.resume;
          user.local.developerDetails.picture = details.picture;
          user.local.developerDetails.interests = details.interests;
          user.local.developerDetails.samplework = details.samplework;
        } else if (req.user.local.usertype === 'client') {
          user.local.clientDetails.picture = details.picture;
          user.local.clientDetails.interests = details.interests;
          user.local.clientDetails.businessCredentials = details['business-credentials'];
        }

        user.save(function(err, updatedUser) {
          if (err) {
            throw err;
          }
          res.redirect('/home');
        });

      } else {
        res.send('User update failed');
      }
    });
};

const normalUser = (app, isLoggedIn) => {
  app.post('/update-user', isLoggedIn, updateUser);

  return app;
}

module.exports = normalUser
