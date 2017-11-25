const mongoose = require('mongoose');
let Users = require('../models/user.js');

// Respond with list of temporary user accounts in json format
const getTempUsers = (req, res) => {
  Users
    .find({ 'local.accountStatus': 'temp' })
    .exec(function(err, users) {
      if (err) {
        throw err;
      } else if (users) {
        // console.log(doc);
        res.json(users);
      } else {
        res.send('No temp accounts found');
      }
    });
};

// Respond with list of rejected user accounts in json format
const getRejectedUsers = (req, res) => {
  Users
    .find({ 'local.accountStatus': 'rejected' })
    .exec(function(err, users) {
      if (err) {
        throw err;
      } else if (users) {
        // console.log(doc);
        res.json(users);
      } else {
        res.send('No rejected accounts found');
      }
    });
};

// Reject application for dev/client account
// mongoose.Types is needed to convert string id to mongoose id
const rejectUser = (req, res) => {
  Users
    .findOne({ '_id':  mongoose.Types.ObjectId(req.body.id) })
    .exec(function(err, user) {
      if (err) { throw err; }
      else if (user) {
        user.local.accountStatus = 'rejected';
        user.local.rejectMessage = req.body.rejectReason;
        user.save(function(err, updatedUser) {
          if (err) {
            throw err;
          }
          res.send(updatedUser);
        });

      } else {
        res.send('User reject failed');
      }
    });
};

// Accept application for dev/client account
const acceptUser = (req, res) => {
  Users
  .findOne({ '_id':  mongoose.Types.ObjectId(req.body.id) })
  .exec(function(err, user) {
    if (err) { throw err; }
    else if (user) {
      // set accountStatus to preAccepted. this is before user puts in more details about himself
      // accountStatus will be later changed to accepted
      user.local.accountStatus = 'accepted';
      user.save(function(err, updatedUser) {
        if (err) {
          throw err;
        }
        res.send(updatedUser);
      });

    } else {
      res.send('User accept failed');
    }
  });
};

const adminOnly = (app, isLoggedIn, isSuperuser) => {
  // We will want this protected so you have to be logged in and is super user to visit
  app.get('/api/temp-users', isLoggedIn, isSuperuser, getTempUsers);
  app.get('/api/rejected-users', isLoggedIn, isSuperuser, getRejectedUsers);
  app.post('/reject-user', isLoggedIn, isSuperuser, rejectUser);
  app.post('/accept-user', isLoggedIn, isSuperuser, acceptUser);

  return app;
}

module.exports = adminOnly
