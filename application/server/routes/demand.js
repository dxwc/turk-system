const mongoose = require('mongoose');
let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const demand = (app, isLoggedIn) => {

  const renderDemand = (req, res) => {
    res.render('demand.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const postDemand = (req, res) => {
    User
      .findOne({ '_id':  req.user.id })
      .exec(function(err, user) {
        if (err) { throw err; }
        // grab params sent over with post request
        const spec = req.body.spec;
        const biddingTimeline = req.body.biddingtimeline;
        // create new Demand document
        let newDemand = new Demand();
        // set new demand document props
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

  app.get('/demand', isLoggedIn, renderDemand);
  app.post('/demand', isLoggedIn, postDemand);
  app.get('/api/demands', isLoggedIn, getAllDemands);

  return app;
}

module.exports = demand
