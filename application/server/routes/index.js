// Routes index

const welcome = require('./welcome');
const home = require('./home');
const login = require('./login');
const signup = require('./signup');
const logout = require('./logout');
const profile = require('./profile');
const pageNotFound = require('./404');
const charge = require('./charge');
const userApps = require('./userApps');
const tempUsers = require('./tempUsers');

const stripeExample = require('./stripeExample');
const paymentApi = require('./payment');
const testApi = require('./test');

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to welcome page
  res.redirect('/');
}

// route middleware to make sure user is superuser
const isSuperuser = (req, res, next) => {
  // If user is superuser, carry on
  if (req.user.local.usertype === 'superuser') {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/home');
}

const configureRoutes = (app, passport) => {
  welcome(app);
  home(app, isLoggedIn);
  login(app, passport);
  signup(app, passport);
  logout(app);
  profile(app, isLoggedIn);
  charge(app);
  userApps(app, isLoggedIn, isSuperuser);
  tempUsers(app, isLoggedIn, isSuperuser);

  stripeExample(app);
  paymentApi(app);
  testApi(app);
  pageNotFound(app); // This should go last

};

// console.log("#####");
// console.log(configureRoutes.toString());

module.exports = configureRoutes;
