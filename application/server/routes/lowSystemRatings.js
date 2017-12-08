let User = require('../models/user.js');
let Demand = require('../models/demand.js');
let Rating = require('../models/rating.js');

const lowSystemRatings = (app, isLoggedIn, checkUserAccess) => {

  const renderlowSystemRatings = (req, res) => {
    res.render('lowSystemRatings.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const getLowSystemRatings = (req, res) => {
    Rating
      .find({ 'rating': { $lt: 3 } } )
      .exec(function(err, ratings) {
        if (err) {
          throw err;
        } else if (ratings) {
          console.log(ratings);
          res.json(ratings);
        } else {
          res.send('No low ratings found');
        }
      });
  };


  app.get('/low-system-ratings', isLoggedIn, checkUserAccess, renderlowSystemRatings);
  app.get('/api/low-ratings', isLoggedIn, checkUserAccess, getLowSystemRatings);

  return app;
}

module.exports = lowSystemRatings
