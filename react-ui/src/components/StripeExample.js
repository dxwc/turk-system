import React, { Component } from 'react';
import axios from 'axios';

export default class StripeExample extends Component {
  componentDidMount () {
    const script = document.createElement("script");
    script.className = "stripe-button";
    script.src = "https://checkout.stripe.com/checkout.js";
    script.async = true;
    script.setAttribute("data-key", "pk_test_6pRNASCoBOKtIshFeQd4XMUh");
    script.setAttribute("data-amount", "500");
    script.setAttribute("data-name", "Turk System");
    script.setAttribute("data-description", "Pay deposit");
    script.setAttribute("data-image", "https://stripe.com/img/documentation/checkout/marketplace.png");
    script.setAttribute("data-locale", "auto");
    script.setAttribute("data-zip-code", "true");

    document.body.appendChild(script);
  }

  handleSubmit = (event) => {


    // Save 'this'
    let self = this;
    // Send form data via axios post
    axios.post('/charge')
    .then(function(response) {
      console.log(response);
      self.setState({formSubmitted: true});
    })
    .catch(function(error) {
      console.log(error);
    });

    // Prevent form default so this function can take over
    event.preventDefault();
  }

  render() {
    // <!-- Generates a token sends server, doesn't charge -->
    // <!-- Use example card number to test: https://stripe.com/docs/testing -->
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

        </form>
        <div>$5 will be charged and immediately be refunded, result will show in JSON.</div>
        <div>Use example card number number 4242424242424242 to test.</div>
      </div>
    );
  }
}
