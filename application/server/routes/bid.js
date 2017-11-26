let Demand = require('../models/demand.js');

const bid = (app, isLoggedIn) => {
  const renderBid = (req, res) => {
    res.render('bid.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const postBid = (req, res) => {
    const demandId = req.body.demandId;
    Demand
      .findOne({ '_id': demandId }) // find demand with demandId
      .exec(function(err, demand) {
        if (err) { throw err; }
        // grab params sent over with post request
        const bidAmount = req.body.bidAmount;
        const promisedTimeline = req.body.promisedTimeline;
        // get currently logged in dev's info
        const devId = req.user.id;
        const email = req.user.local.email;
        const name = req.user.local.realname;

        // create new bid object
        let newBid = {
          userId: devId,
          email: email,
          name: name,
          bidAmount: bidAmount,
          promisedTimeline: promisedTimeline
        };

        // get array of all bids for current demand
        let currentBids = demand.bids;
        // push new bid to array of bids
        currentBids.push(newBid);
        // save updated list of bids
        demand.bids = currentBids;
        demand.save(function(err) {
          if (err) {
            throw err;
          }
          res.redirect('/bid');
        });

      });
  };

  app.get('/bid', isLoggedIn, renderBid);
  app.post('/bid', isLoggedIn, postBid);

  return app;
}

module.exports = bid
