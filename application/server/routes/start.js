// Start page
let User = require('../models/user.js');

const start = (app) => {
  const renderStart = (req, res) => {
    // if user is logged in, redirect to /home
    if (req.isAuthenticated()) {
      return res.redirect('/home');
    }
    res.render('start.ejs');
  };

  const getAllUsers = (req, res) => {
    User
    .find()
    .exec(function(err, users) {
      if(err) { throw err; }
      console.log(users);
      res.json(users);
    });
  }

  app.get('/', renderStart);
  app.get('/api/getallusers', getAllUsers);

  return app;
}

module.exports = start
