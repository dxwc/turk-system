// Routes index. Hook up all routes

const home = require('./home');
const login = require('./login');
// const signup = require('./signup');
// const logout = require('./logout');
// const profile = require('./profile');

const paymentApi = require('./payment');
const testApi = require('./test');


const configureRoutes = (app, passport) => {
  home(app);

  paymentApi(app);
  testApi(app);

};

// console.log("#####");
// console.log(configureRoutes.toString());

module.exports = configureRoutes;
