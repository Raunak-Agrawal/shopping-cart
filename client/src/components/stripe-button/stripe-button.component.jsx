import React from "react";
import StripeCheckout from "react-stripe-checkout";
import PropTypes from "prop-types";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_1jtUibwCgknrzEA88BmOvcWO";

  const onToken = token => {
    console.log(token);
    axios({
      url: "/payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(res => alert("Payment success"))
      .catch(err => {
        console.log(err.message);
        alert("There is a issue with your payment");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Shopping Cart"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
StripeCheckoutButton.propTypes = {
  price: PropTypes.number.isRequired
};
export default StripeCheckoutButton;
