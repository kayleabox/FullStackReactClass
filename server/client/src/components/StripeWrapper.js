import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class StripeWrapper extends Component {
  render() {
    console.log(process.env.REACT_APP_STRIPE_KEY);
    return (
      <StripeCheckout
        name='Email App'
        description='$5 for 5 credits'
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className='btn'>ADD CREDITS</button>
      
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(StripeWrapper);