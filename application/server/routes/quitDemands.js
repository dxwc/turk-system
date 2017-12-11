let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const quitDemand = (app, isLoggedIn, checkUserAccess) => {

  const renderQuitDemands = (req, res) => {
    res.render('manageQuitReqs.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const quitRequestedUsers = (req, res) => {
    User
      .find({ 'local.accountDeleteStatus': 'quitRequested' })
      .exec(function(err, users) {
        if (err) { throw err; }
        res.send(users);
      });
  }

  const approveQuitDemand = (req, res) => {
    const userId = req.params.userid;
    User
      .findOne({ '_id': userId })
      .exec(function(err, user) {
        if (err) { throw err; }
        user.local.accountDeleteStatus = 'quitApproved';
        user.save(function(err) {
          if (err) {
            throw err;
          }
          console.log('quit demand approved');
          res.send('quit demand approved');
        })
      });
  }

  app.get('/quit-demands', isLoggedIn, checkUserAccess, renderQuitDemands);
  app.get('/api/quit-req-users', quitRequestedUsers);
  app.get('/api/approve-quit-demand/:userid', approveQuitDemand);

  return app;
}

module.exports = quitDemand
