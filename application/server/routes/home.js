let User = require('../models/user.js');
let Demand = require('../models/demand.js');
let Rating = require('../models/rating.js');

const home = (app, isLoggedIn, checkUserAccess) => {
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  const renderHomeAndCalculateStatus = (req, res) => {
  	Rating
  	  .find({ 'toUserId' : req.user._id })
  	  .exec(function(err, allRatingsForUser) {
  	  	if(err) { throw err; }
  	  	//Loop through all the rating and get the sum and avg
  	  	if (allRatingsForUser.length >= 5) {
	  	  let sum = 0;
	  	  allRatingsForUser.forEach((ratingObj, i) => {
	  	  	sum += ratingObj.rating;
	  	  });
	  	  let avgRating = sum/allRatingsForUser.length;
	  	  if (avgRating <= 2) {
	  	  	User
	  	  	 .findOne({ '_id' : req.user._id})
	  	  	 .exec(function(err2, setUserStatus) {
	  	  	 	setUserStatus.local.accountStatus = 'poorperformance';
	  	  	 	setUserStatus.local.warningCounter += 1;
	  	  	 	setUserStatus.save(function(err) {
          			if (err) { throw err; }
          			res.render('home.ejs', {
      	 				user: req.user // get the user out of session and pass to template
    				});
        		});
	  	  	 })	
	  	  }
  	    }	
  	  })
  };

  app.get('/home', isLoggedIn, checkUserAccess, renderHomeAndCalculateStatus);

  return app;
}

module.exports = home
