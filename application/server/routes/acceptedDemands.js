let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const demand = (app, isLoggedIn, checkUserAccess) => {

  const renderManageDemands = (req, res) => {
    res.render('manageAcceptedDemands.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const getUserAcceptedDemands = (req, res) => {
    Demand
      .find({ 'clientID': req.params.id, 'demandStatus' : 'bidAccepted' })
      .exec(function(err, demands) {
        if (err) {
          throw err;
        } else if (demands) {
          res.json(demands);
        } else {
          res.send('No demands found');
        }
      });
  };

  app.get('/manage-accepted-demands', isLoggedIn, checkUserAccess, renderManageDemands);
  app.get('/api/acceptedDemands/:id', isLoggedIn, getUserAcceptedDemands);

  return app;
}

module.exports = demand
