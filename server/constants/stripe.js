// Stripe secret api key

const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_live_MY_SECRET_KEY'
    : 'sk_test_BQokikJOvBiI2HlWgH4olfQ2';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
