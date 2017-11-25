const bid = (app, isLoggedIn) => {
  app.get('/bid', isLoggedIn, function(req, res) {
    res.render('bid.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = bid
