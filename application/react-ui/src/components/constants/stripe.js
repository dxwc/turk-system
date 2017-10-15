// Stripe publishable API key
const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_6pRNASCoBOKtIshFeQd4XMUh';

export default STRIPE_PUBLISHABLE;
