const paymentApi = require('./payment');
const testApi = require('./test');

const configureRoutes = (app, passport) => {
  paymentApi(app);
  testApi(app);
};

// console.log("#####");
// console.log(configureRoutes.toString());

module.exports = configureRoutes;
