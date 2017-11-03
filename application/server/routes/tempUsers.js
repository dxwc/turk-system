var Users = require('../models/user.js');

const getTempUsers = function(req, res) {
    Users
      .find({ 'local.isTempAccount': true })
      .exec(function(err, doc) {
        if (err) { throw err; }
        else if (doc) {
          console.log(doc);
          res.json(doc);
        }
      });
  };

const tempUsers = (app, isLoggedIn, isSuperuser) => {
  // We will want this protected so you have to be logged in and is super user to visit
  app.get('/temp-users', isLoggedIn, isSuperuser, getTempUsers);

  return app;
}

module.exports = tempUsers
