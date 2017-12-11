let User = require('../models/user.js');

const topUsers = (app, isLoggedIn) => {
  let topUsersWithMostTransactions = 0;
  let recommendedUsers = 0;
  //Query the user itself and see if it has any transactions
  
  app.get('/topUsers', isLoggedIn, function(req, res) {
    res.render('topUsers.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  return app;
}

module.exports = topUsers 
