let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const demand = (app, isLoggedIn, checkUserAccess) => {

  const renderDemand = (req, res) => {
    res.render('demand.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const renderManageDemands = (req, res) => {
    res.render('manageDemands.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  // allow client to post a demand
  const postDemand = (req, res) => {
    User
      .findOne({ '_id': req.user.id })
      .exec(function(err, user) {
        if (err) { throw err; }
        // grab params sent over with post request
        const spec = req.body.spec;
        const biddingTimeline = req.body.biddingtimeline;
        // get currently logged in user's id
        const clientID = req.user.id;
        // create new Demand document
        let newDemand = new Demand();
        // set new demand document props
        newDemand.clientID = clientID;
        newDemand.spec = spec;
        newDemand.biddingTimeline = biddingTimeline;
        // get array of currently posted demand ids
        let postedDemandIds = user.local.clientDetails.postedDemandIds;
        // push new demand id to list of demand ids
        postedDemandIds.push(newDemand.id);
        // save updated list of demand ids
        user.local.clientDetails.postedDemandIds = postedDemandIds
        user.save(function(err) {
          if (err) {
            throw err;
          }
          // save new demand document to dB
          newDemand.save(function(err) {
            if (err) {
              throw err;
            }
            res.redirect('/home');
          });
        })
      });
  };

  const getAllDemands = (req, res) => {
    Demand
      .find()
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

  const getUserDemands = (req, res) => {
    Demand
      .find({ 'clientID': req.params.id })
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

  app.get('/demand', isLoggedIn, checkUserAccess, renderDemand);
  app.post('/demand', isLoggedIn, checkUserAccess, postDemand);
  app.get('/manage-demands', isLoggedIn, checkUserAccess, renderManageDemands);
  app.get('/api/demands', getAllDemands);
  app.get('/api/demands/:id', isLoggedIn, getUserDemands);

  return app;
}

module.exports = demand
