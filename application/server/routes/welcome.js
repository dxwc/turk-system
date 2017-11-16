// Home page

const welcome = (app, isLoggedIn) => {
  app.get('/welcome', isLoggedIn, function(req, res) {
    res.render('welcome.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = welcome
