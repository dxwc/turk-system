// Server URL
const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://turk-system.herokuapp.com/stripe'
  : 'http://localhost:5000/stripe';

export default PAYMENT_SERVER_URL;
