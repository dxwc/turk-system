const login = (app, passport) => {
  // show the login form
  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
    // app.post('/login', do all our passport stuff here);
};

module.exports = login
