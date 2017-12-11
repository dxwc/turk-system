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
        //console.log(users);
        res.json(users);
      });
  }

  const searchUserByEmail = (req, res) => {
    const email = req.params.email;
    const emailRe = new RegExp('^' + email + '$', 'i');
    // console.log(email);
    User
      .findOne({ 'local.email': emailRe })
      .exec(function(err, user) {
        if(err) { throw err; }
        //console.log(user);
        res.json(user);
      });

  }

  app.get('/', renderStart);
  app.get('/api/getallusers', getAllUsers);
  app.get('/api/search/email/:email', searchUserByEmail);

  return app;
}

module.exports = start
