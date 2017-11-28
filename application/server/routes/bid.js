let Demand = require('../models/demand.js');

const bid = (app, isLoggedIn, checkUserAccess) => {
  const renderBid = (req, res) => {
    // render bid.ejs
    res.render('bid.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  // dev post bid
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
          promisedTimeline: promisedTimeline,
          isLowestBid: false
        };

        // get array of all bids for current demand
        let currentBids = demand.bids;
        if (currentBids.length === 0) {
          // if there are no current bids, set the first bid to the lowest bid
          newBid.isLowestBid = true;
        } else {
          // check if the new bid is the lowest bid
          currentBids.forEach((bid, i) => {
            // find lowest bid
            if (bid.isLowestBid === true) {
              // once lowest bid is found, compare its bidAmoutn to new bid's bidAmount
              if (newBid.bidAmount < bid.bidAmount) {
                // if true, set newBid's isLowestBid to true and old lowest bid's isLowestBid to false
                newBid.isLowestBid = true;
                currentBids[i].isLowestBid = false;
              }
            }
          });
        }

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

  // client accepts bid
  const acceptBid = (req, res) => {

  };

  app.get('/bid', isLoggedIn, checkUserAccess, renderBid);
  app.post('/bid', isLoggedIn, checkUserAccess, postBid);
  app.post('./accept-bid', isLoggedIn, checkUserAccess, acceptBid);

  return app;
}

module.exports = bid
