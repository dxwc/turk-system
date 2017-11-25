// Start page

const start = (app) => {
  app.get('/', function(req, res) {
    // if user is logged in, redirect to /home
    if (req.isAuthenticated()) {
      return res.redirect('/home');
    }
    res.render('start.ejs');
  });

  return app;
}

module.exports = start
