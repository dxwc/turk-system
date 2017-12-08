let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const contractedDemands = (app, isLoggedIn, checkUserAccess) => {

  const renderContractedDemands = (req, res) => {
    res.render('contractedDemands.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const getContractedDemands = (req, res) => {
    Demand
      .find({ 'contractedDevId': req.user.id })
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

  app.get('/contracted-demands', isLoggedIn, checkUserAccess, renderContractedDemands);
  app.get('/api/contracted-demands', isLoggedIn, getContractedDemands);

  return app;
}

module.exports = contractedDemands
