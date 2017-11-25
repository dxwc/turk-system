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
    Users
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
        // save new demand document to dB
        newDemand.save(function(err) {
          if (err) {
            throw err;
          }
          res.redirect('/home');
        });
      });
  };

  app.get('/demand', isLoggedIn, renderDemand);
  app.post('/demand', isLoggedIn, postDemand);

  return app;
}

module.exports = demand
