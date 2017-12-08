let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const contractedDemands = (app, isLoggedIn, checkUserAccess) => {

  const renderContractedDemands = (req, res) => {
    res.render('contractedDemands.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  // const getUserAcceptedDemands = (req, res) => {
  //   Demand
  //     .find({ 'clientID': req.params.id, 'demandStatus' : 'bidAccepted' })
  //     .exec(function(err, demands) {
  //       if (err) {
  //         throw err;
  //       } else if (demands) {
  //         res.json(demands);
  //       } else {
  //         res.send('No demands found');
  //       }
  //     });
  // };

  app.get('/contracted-demands', isLoggedIn, checkUserAccess, renderContractedDemands);
  // app.get('/api/acceptedDemands/:id', isLoggedIn, getUserAcceptedDemands);

  return app;
}

module.exports = contractedDemands
