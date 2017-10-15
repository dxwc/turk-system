// Home page

const home = app => {
  app.get('/', function(req, res) {
    res.render('home.ejs');
  });

  return app;
}

module.exports = home
