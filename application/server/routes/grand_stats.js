let User = require('../models/user.js');

const grandstats = (app, isLoggedIn) => {

  let numberOfClients = 0;
  let numberOfDeveloprs = 0;	
  const getNumberOfClients = (req, res) => {
  	User
  	  .count({ 'local.usertype': 'client' })
  	  .exec(function(err, clientCount) {
  	  	if (err) { throw err; }
  	  	numberOfClients = clientCount;
  	  	// console.log(numberOfClients);
  	  	User
  	  	  .count({ 'local.usertype': 'developer' })
  	  	  .exec(function(err2, devCount) {
  	  	  	if (err2) { throw err2; }
  	  	  	numberOfDevelopers = devCount;
  	  	  	res.render('grandstats.ejs', {
	      	  user: req.user,
	      	  clients: numberOfClients,
	      	  developers: numberOfDevelopers
    		});
  	  	})
  	}) 
  };

  app.get('/grandstats', isLoggedIn, getNumberOfClients);

  return app;
}

module.exports = grandstats