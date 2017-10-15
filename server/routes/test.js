const testApi = app => {

  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // test
  app.get('/test', function (req, res) {
    res.send('testing...')
  })

  return app;
}



module.exports = testApi
