import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

function Shop({ match }) {
  console.log(match, "match");
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={CollectionPage}
      />
    </div>
  );
}
Shop.propTypes = {
  match: PropTypes.object.isRequired
};

export default Shop;
