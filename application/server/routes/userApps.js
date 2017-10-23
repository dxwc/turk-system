const userApps = (app, isSuperuser) => {
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/user-apps', isSuperuser, function(req, res) {
    res.render('userApps.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = userApps
