let User = require('../models/user.js');

const topUsers = (app, isLoggedIn, checkUserAccess) => {

  const getTopUsers = (req, res) => {	
	  let topUsersWithMostTransactions = 0;
	  let recommendedUsers = 0;
	  //Query the user itself and see if it has any transactions
	  User
	  .findOne({ '_id' : req.user._id})
	  .exec(function(err, thisUser) {
	  	if(thisUser.local.usertype == 'client') {
	  		//if this user has posted demands
	  		if (thisUser.local.clientDetails.postedDemandIds > 0) {
	  			// not a new user
	  			// send users with similar interest
	  			let thisUserInterest = thisUser.local.clientDetails.interests;
	  			User
	  			.find({$or:[ {'local.developerDetails.interests': thisUserInterest}, {'local.clientDetails.interests': thisUserInterest}]})
	  			.exec(function(err2, similarInterests) {
	  				console.log("Find interests");
	  				console.log(similarInterests);
	  				res.render('topUsers.ejs', {
				      	user: req.user,
				      	type: 'Old',
				      	interests: thisUserInterest,
				      	otherUsers: similarInterests
			    	}); 
	  			})
	  		} else {
	  			// is a new user
	  			User
  	  	  	  	  .find({ 'local.usertype': 'client' })
  	  	  	  	  .sort({ 'local.clientDetails.postedDemandIds':-1})
  	  	  	  	  .limit(3)
  	  	  	  	  .select('local.realname __v')
  	  	  	  	  .exec(function(err4, mostProjectClients) {
	  	  	  		if (err4) { throw err4; }
	  	  	  		console.log(mostProjectClients);
	  	  	  		console.log("new user")
	  	  	  		res.render('topUsers.ejs', {
				      	user: req.user,
				      	type: 'New',
				      	otherUsers: mostProjectClients
			    	}); 
	  	  	  	})
	  		}
	  	} else {
	  		//if this user has posted demands
	  		console.log(thisUser.local.developerDetails);	
	  		console.log(thisUser.local.developerDetails.bidDemandIds.length);
	  		if (thisUser.local.developerDetails.bidDemandIds.length > 0) {
	  			// not a new user
	  			// send users with similar interest
	  			let thisUserInterest = thisUser.local.developerDetails.interests;
	  			User
	  			.find({$or:[ {'local.developerDetails.interests': thisUserInterest}, {'local.clientDetails.interests': thisUserInterest}]})
	  			.exec(function(err2, similarInterests) {
	  				console.log("Find interests");
	  				console.log(similarInterests);
	  				res.render('topUsers.ejs', {
				      	user: req.user,
				      	type: 'Old',
				      	interests: thisUserInterest,
				      	otherUsers: similarInterests
			    	}); 
	  			})
	  		} else {
	  			// is a new user
	  			User
	  			.find({ 'local.usertype': 'client' })
	  			.sort({'local.clientDetails.postedDemandIds':-1})
	  	  	  	.limit(3)
	  	  	  	.exec(function (err, clientWithPostedDemand) {
	  	  	  		console.log(clientWithPostedDemand);
	  	  	  		console.log("new user developer")
	  	  	  		res.render('topUsers.ejs', {
				      	user: req.user,
				      	type: 'New',
				      	otherUsers: clientWithPostedDemand,
			    	}); 
	  	  	  	})
	  		}
	  	}

	  })
  }
  app.get('/topUsers', isLoggedIn, getTopUsers);

  return app;
}

module.exports = topUsers 
