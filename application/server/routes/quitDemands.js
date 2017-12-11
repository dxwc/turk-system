let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const quitDemand = (app, isLoggedIn, checkUserAccess) => {

  const renderQuitDemands = (req, res) => {
    res.render('manageQuitReqs.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  // const sendQuitDemand = (req, res) => {
  //   // find logged in user and set accountStatus to 'quitRequested'
  //   const userId = req.user.id;
  //   User
  //     .findOne({ '_id': userId })
  //     .exec(function(err, user) {
  //       if (err) { throw err; }
  //       user.local.accountStatus = 'quitRequested';
  //       user.save(function(err) {
  //         if (err) {
  //           throw err;
  //         }
  //         console.log('quit demand sent');
  //       })
  //     });
  // };

  const quitRequestedUsers = (req, res) => {
    User
      .find({ 'local.accountStatus': 'quitRequested' })
      .exec(function(err, users) {
        if (err) { throw err; }
        res.send(users);
      });
  }

  app.get('/quit-demands', isLoggedIn, checkUserAccess, renderQuitDemands);
  // app.get('/api/send-quit-demand', isLoggedIn, checkUserAccess, sendQuitDemand);
  app.get('/api/quit-req-users', quitRequestedUsers);

  return app;
}

module.exports = quitDemand
