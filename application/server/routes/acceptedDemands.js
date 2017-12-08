let User = require('../models/user.js');
let Demand = require('../models/demand.js');
let Rating = require('../models/rating.js');

const demand = (app, isLoggedIn, checkUserAccess) => {

  const renderManageDemands = (req, res) => {
    res.render('manageAcceptedDemands.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const getUserAcceptedDemands = (req, res) => {
    Demand
      .find({ 'clientID': req.params.id, $or : [{'demandStatus' : 'bidAccepted'}, {'demandStatus' : 'submitted'}]  })
      .exec(function(err, demands) {
        if (err) {
          throw err;
        } else if (demands) {
          console.log(demands);
          //demands.demandStatus = 'submitted';
          res.json(demands);
        } else {
          res.send('No demands found');
        }
      });
  };

  // allow client to post a demand
  const postRating = (req, res) => {
    Demand
      .findOne({ '_id': req.body.systemId })
      .exec(function(err, data) {
        if (err) { throw err; }
        // grab params sent over with post request
        const ratingValue = req.body.rating;
        const fromUserId = req.user.id;
        const finalAcceptedBidAmount = data.finalAcceptedBidAmount;
        const contractedDevId = data.contractedDevId;

        let newRating = new Rating();
        newRating.fromUserId = fromUserId;
        newRating.rating = ratingValue;
        newRating.postId = req.body.systemId;
        if (ratingValue < 3) {
          newRating.ratingText = req.body.ratingText;
        } else {
          // if rating >=3, the money helf by superuser account is xferred to dev
          const transactionAmount = finalAcceptedBidAmount * 0.45;
          User
            .findOne({ 'local.accountStatus': 'superuser' })
            .exec(function(err, superuser) {
              if (err) { throw err; }
              superuser.local.deposit -= transactionAmount;
              superuser.save(function(err) {
                if (err) {
                  throw err;
                }
                // console.log('50% of bid amount sent to superuser');

                // send money to dev
                User
                  .findOne({ '_id': contractedDevId })
                  .exec(function(err, dev) {
                    if (err) { throw err; }
                    dev.local.deposit += transactionAmount;
                    dev.save(function(err) {
                      if (err) {
                        throw err;
                      }
                      // console.log('50% of bid amount taken from client');
                    })
                  });
              });

            });
        }
        // Get all the bids from the demand
        // If any of the demand has the isAccepted get that
        // get array of all bids for current demand
        let currentBids = data.bids;
        // check if the new bid is accepted
        console.log(currentBids);
        for (var bid of currentBids) {
          if (bid.bidStatus === 'accepted') {
            // once accepted bid is found
            console.log(bid.bidStatus);
            newRating.toUserId = bid.userId;
            break;
          }
        }

        newRating.save(function(err) {
          if (err) {
            throw err;
          }
            Rating
              .find()
              .exec(function(err1, ratingss) {
                console.log(ratingss);
                res.redirect('/');
              })

        });

      });
  };

  app.post('/send-rate', isLoggedIn, checkUserAccess, postRating);
  app.get('/manage-accepted-demands', isLoggedIn, checkUserAccess, renderManageDemands);
  app.get('/api/acceptedDemands/:id', isLoggedIn, getUserAcceptedDemands);

  return app;
}

module.exports = demand
