import React, { Component } from 'react';
import axios from 'axios';

import Checkout from './Checkout';

export default class StripeExample extends Component {
  render() {
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
