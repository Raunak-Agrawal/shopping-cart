import React from "react";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { connect } from "react-redux";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

function CollectionOverview({ collections }) {
  return (
    <div className="collection-overview">
      {collections.map(({ id, ...otherCollectionItems }) => {
        return <CollectionPreview key={id} {...otherCollectionItems} />;
      })}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
});

CollectionOverview.propTypes = {
  collections: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(CollectionOverview);
