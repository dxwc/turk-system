// These URLs are used to create whitelist for CORS
const FRONTEND_DEV_URLS = [ 'http://localhost:3000' ];
// https://turk-system.herokuapp.com/
const FRONTEND_PROD_URLS = [
  'https://www.herokuapp.com/3000',
  'https://turk-system.herokuapp.com/3000'
];

module.exports = process.env.NODE_ENV === 'production'
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;
