import React from "react";
import "./collection-preview.styles.scss";
import PropTypes from "prop-types";
import CollectionItem from "../collection-item/collection-item.component";
import { Link, withRouter } from "react-router-dom";

function CollectionPreview({ title, items, ...props }) {
  return (
    <div className="collection-preview">
      <h1 className="title">
        <Link to={`${props.match.url}/${props.routeName}`}>
          {title.toUpperCase()}
        </Link>
      </h1>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map(item => {
            return <CollectionItem key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
}
CollectionPreview.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  routeName: PropTypes.string,
  match: PropTypes.object
};
export default withRouter(CollectionPreview);
