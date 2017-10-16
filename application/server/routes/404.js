const pageNotFound = app => {
  app.get('*', (req, res) => {
    res.status(404).send('404 Page not found');
  });
  return app;
}

module.exports = pageNotFound
