let User = require('../models/user.js');
let Demand = require('../models/demand.js');
let Rating = require('../models/rating.js');

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

  const finishDemand = (req, res) => {
    // console.log(req.body);
    Demand
      .findOne({ '_id': req.body.demandId })
      .exec(function(err, demand) {
        if (err) {
          throw err;
        }
        console.log(demand);
        demand.demandStatus = 'submitted';
        const finalAcceptedBidAmount = demand.finalAcceptedBidAmount;
        const clientID = demand.clientID;
        demand.save(function(err) {
          if (err) {
            throw err;
          }
          console.log("finalAcceptedBidAmount: " + finalAcceptedBidAmount);
          // send other 50% of bid price to superuser
          // find superuser user model
          User
            .findOne({ 'local.accountStatus': 'superuser' })
            .exec(function(err, superuser) {
              if (err) { throw err; }
              superuser.local.deposit += finalAcceptedBidAmount * 0.5;
              superuser.save(function(err) {
                if (err) {
                  throw err;
                }
                console.log('50% of bid amount sent to superuser');

                // find client who created demand and take away 50% of bidding price from his money
                User
                  .findOne({ '_id': clientID })
                  .exec(function(err, client) {
                    if (err) { throw err; }
                    client.local.deposit -= finalAcceptedBidAmount * 0.5;
                    client.save(function(err) {
                      if (err) {
                        throw err;
                      }
                      console.log('50% of bid amount taken from client');

                      // create new rating
                      const rateValue = req.body.rateValue;
                      console.log("req.body...");
                      console.log(req.body);
                      console.log("rateValue: " + rateValue);
                      const fromUserId = req.user.id;
                      // use clientID from above
                      const toUserId = clientID;

                      let newRating = new Rating();
                      newRating.fromUserId = fromUserId;
                      newRating.toUserId = toUserId;
                      newRating.rating = rateValue;
                      // postId/systemId is demand id
                      newRating.postId = req.body.systemId;
                      if (rateValue < 3) {
                        newRating.ratingText = req.body.ratingText;
                      }
                      console.log(newRating);
                      newRating.save(function(err) {
                        if (err) {
                          throw err;
                        }
                        res.redirect('/');
                      });

                    });
                  });
              });

            });

          // res.redirect('/home');
        });
      });
  }

  app.get('/contracted-demands', isLoggedIn, checkUserAccess, renderContractedDemands);
  app.get('/api/contracted-demands', isLoggedIn, getContractedDemands);
  app.post('/api/finish-demand', isLoggedIn, checkUserAccess, finishDemand)

  return app;
}

module.exports = contractedDemands
