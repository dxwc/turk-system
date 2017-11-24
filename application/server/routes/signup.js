const signup = (app, passport) => {
  // verify that the user is authenticated
  app.get('/api/user/verify', (req, res, next) => {
  	if(req.user) {
  		return res.status(200).json({
  			user: req.user,
  			authenticated: true
  		});
  	} else {
  		return res.status(401).json({
  			error: 'User is not authenticated',
  			authenticated: false
  		});
  	}
  });

  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      // return error if user not found
      if (!user) {
        info['authenticated'] = false;
        return res.status(200).json(info);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
    			authenticated: true
    		});
      });
    })(req, res, next);
  });

  return app;
}

module.exports = signup
