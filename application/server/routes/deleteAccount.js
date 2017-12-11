let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const deleteAccount = (app, isLoggedIn, checkUserAccess) => {

  const renderDeleteAccount = (req, res) => {
    res.render('deleteAccount.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const sendQuitDemand = (req, res) => {
    // find logged in user and set accountStatus to 'quitRequested'
    const userId = req.user.id;
    User
      .findOne({ '_id': userId })
      .exec(function(err, user) {
        if (err) { throw err; }
        user.local.accountStatus = 'quitRequested';
        user.save(function(err) {
          if (err) {
            throw err;
          }
          console.log('quit demand sent');
        })
      });
  };

  app.get('/delete-account', isLoggedIn, checkUserAccess, renderDeleteAccount);
  app.get('/api/send-quit-demand', isLoggedIn, checkUserAccess, sendQuitDemand);

  return app;
}

module.exports = deleteAccount
