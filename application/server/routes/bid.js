const bid = (app, isLoggedIn) => {
  const renderBid = (req, res) => {
    res.render('bid.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  // const postBid = (req, res) => {
  //   User
  //     .findOne({ '_id':  req.user.id })
  //     .exec(function(err, user) {
  //       if (err) { throw err; }
  //       // grab params sent over with post request
  //       const spec = req.body.spec;
  //       const biddingTimeline = req.body.biddingtimeline;
  //       // create new Demand document
  //       let newDemand = new Demand();
  //       // set new demand document props
  //       newDemand.spec = spec;
  //       newDemand.biddingTimeline = biddingTimeline;
  //       // get array of currently posted demand ids
  //       let postedDemandIds = user.local.clientDetails.postedDemandIds;
  //       // push new demand id to list of demand ids
  //       postedDemandIds.push(newDemand.id);
  //       // save updated list of demand ids
  //       user.local.clientDetails.postedDemandIds = postedDemandIds
  //       user.save(function(err) {
  //         if (err) {
  //           throw err;
  //         }
  //         // save new demand document to dB
  //         newDemand.save(function(err) {
  //           if (err) {
  //             throw err;
  //           }
  //           res.redirect('/home');
  //         });
  //       })
  //     });
  // };

  app.get('/bid', isLoggedIn, renderBid);
  app.post('/bid', isLoggedIn, postBid);

  return app;
}

module.exports = bid
