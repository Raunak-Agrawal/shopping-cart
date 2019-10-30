import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg.svg";
import "./cart-icon.styles.scss";
import { toggleCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

function CartIcon({ toggleCart, itemCount }) {
  return (
    <div className="cart-icon" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  toggleCart: () => dispatch(toggleCart())
});
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

CartIcon.propTypes = {
  toggleCart: PropTypes.func,
  itemCount: PropTypes.number.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
