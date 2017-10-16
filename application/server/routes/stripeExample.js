const stripeExample = app => {
  app.get('/stripe_example', function (req, res) {
    res.render('stripe_example.ejs');
  });

  return app;
}

module.exports = stripeExample
