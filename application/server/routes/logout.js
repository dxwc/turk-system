const logout = app => {
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return app;
}

module.exports = logout
