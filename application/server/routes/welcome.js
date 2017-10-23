// Home page

const home = app => {
  app.get('/', function(req, res) {
    res.render('welcome.ejs');
  });

  return app;
}

module.exports = home
