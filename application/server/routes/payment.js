
const payment = (app, isLoggedIn) => {
  app.get('/payment', isLoggedIn, function(req, res) {
    res.render('payment.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = payment
