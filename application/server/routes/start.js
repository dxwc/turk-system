// Start page

const start = app => {
  app.get('/', function(req, res) {
    res.render('start.ejs');
  });

  return app;
}

module.exports = start
