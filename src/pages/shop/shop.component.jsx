import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";
import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded
} from "../../redux/shop/shop.selectors";

let CollectionOverViewWithSpinner = WithSpinner(CollectionOverview);
let CollectionPageWithSpinner = WithSpinner(CollectionPage);
class Shop extends Component {
  componentDidMount() {
    let { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }
  render() {
    let { match, isCollectionFetching, isCollectionLoaded } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverViewWithSpinner
              {...props}
              isLoading={isCollectionFetching}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              {...props}
              isLoading={!isCollectionLoaded}
            />
          )}
        />
      </div>
    );
  }
}

Shop.propTypes = {
  match: PropTypes.object.isRequired,
  updateCollections: PropTypes.func,
  fetchCollectionsStartAsync: PropTypes.func,
  isCollectionFetching: PropTypes.bool.isRequired,
  isCollectionLoaded: PropTypes.bool
};
const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded
});
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
