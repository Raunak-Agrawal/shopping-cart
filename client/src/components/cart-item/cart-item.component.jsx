import React from "react";
import PropTypes from "prop-types";
import "./cart-item.styles.scss";

export default function CartItem({
  item: { imageUrl, name, price, quantity }
}) {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="item" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="prices">
          {quantity} * ${price}
        </span>
      </div>
    </div>
  );
}
CartItem.propTypes = {
  item: PropTypes.object.isRequired
};
