let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const lowSystemRatings = (app, isLoggedIn, checkUserAccess) => {

  const renderlowSystemRatings = (req, res) => {
    res.render('lowSystemRatings.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };


  app.get('/low-system-ratings', isLoggedIn, checkUserAccess, renderlowSystemRatings);


  return app;
}

module.exports = lowSystemRatings
