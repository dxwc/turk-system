const home = (app, isLoggedIn, checkIfRejected) => {
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/home', isLoggedIn, checkIfRejected, function(req, res) {
    // console.log(req.user);
    res.render('home.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = home
