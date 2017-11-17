
const mostActive = (app, isLoggedIn) => {
  app.get('/mostactive', isLoggedIn, function(req, res) {
    res.render('mostActive.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = mostActive
