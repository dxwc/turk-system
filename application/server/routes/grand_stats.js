const grandstats = (app, isLoggedIn) => {
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/grandstats', isLoggedIn, function(req, res) {
    res.render('grandstats.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = grandstats