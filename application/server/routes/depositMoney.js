let User = require('../models/user.js');
let Demand = require('../models/demand.js');

const depositMoney = (app, isLoggedIn, checkUserAccess) => {

  const renderDepositMoney = (req, res) => {
    res.render('depositMoney.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  };

  const saveDeposit = (req, res) => {
    User
      .findOne({ '_id': req.user.id })
      .exec(function(err, user) {
        if (err) {
          throw err;
        }
        console.log(typeof req.body.deposit);
        // user.local.deposit = 1000;
        // console.log(user);
        user.local.deposit += Number(req.body.deposit);
        user.save(function(err) {
          if (err) {
            throw err;
          }
          res.redirect('/home');
        });
      });
  }

  app.get('/deposit-money', isLoggedIn, checkUserAccess, renderDepositMoney);
  app.post('/api/deposit-money', isLoggedIn, checkUserAccess, saveDeposit);

  return app;
}

module.exports = depositMoney
