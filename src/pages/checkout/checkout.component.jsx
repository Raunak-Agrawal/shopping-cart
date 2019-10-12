import React from "react";
import "./checkout.styles.scss";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import {
  selectCartItems,
  selectCartItemTotal
} from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

function Checkout({ cartItems, total }) {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(item => {
        return <CheckoutItem key={item.id} cartItem={item} />;
      })}
      <div className="total">
        <span>TOTAL :${total}</span>
      </div>
    </div>
  );
}
Checkout.propTypes = {
  cartItems: PropTypes.array,
  total: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  total: selectCartItemTotal,
  cartItems: selectCartItems
});
export default connect(mapStateToProps)(Checkout);
