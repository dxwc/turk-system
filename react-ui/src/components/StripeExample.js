import React, { Component } from 'react';
import axios from 'axios';

import Checkout from './Checkout';

export default class StripeExample extends Component {
  render() {
    // <!-- Generates a token sends server, doesn't charge -->
    // <!-- Use example card number to test: https://stripe.com/docs/testing -->
    return (
      <div>
        <Checkout
          name={'Test'}
          description={'Test Stripe Payment Checkout'}
          amount={1}
        />
        <div>1 euro will be charged and immediately be refunded, result will show in JSON.</div>
        <div>Use example card number number 4242424242424242 to test.</div>
      </div>
    );
  }
}
