// Home page

const demand = (app, isLoggedIn) => {
  app.get('/demand', isLoggedIn, function(req, res) {
    res.render('demand.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = demand
