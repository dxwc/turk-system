let User = require('../models/user.js');
let Rating = require('../models/rating.js');

const rating = (app, isLoggedIn, checkUserAccess) => {
  // allow client to post a demand
  const postRating = (req, res) => {
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

  app.post('/rating', isLoggedIn, checkUserAccess, postRating);

  return app;
}

module.exports = demand