const userApps = (app, isLoggedIn, isSuperuser) => {
  // We will want this protected so you have to be logged in and is super user to visit
  app.get('/user-apps', isLoggedIn, isSuperuser, function(req, res) {
    res.render('userApps.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = userApps
