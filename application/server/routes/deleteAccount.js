let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const deleteAccount = (app, isLoggedIn, checkUserAccess) => {

  const renderDeleteAccount = (req, res) => {
    res.render('deleteAccount.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  app.get('/delete-account', isLoggedIn, checkUserAccess, renderDeleteAccount);

  return app;
}

module.exports = deleteAccount
