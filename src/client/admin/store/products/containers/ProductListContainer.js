import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/products';
import Product from '../components/Product';

class ProductListContainer extends Component {

  componentDidMount() {
    this.props.dispatch(actions.fetchProducts());
  }

  render() {
    return (
      <div>
        {this.props.products.map(p =>
            <Product
              key={p._id}
              title={p.title}
              slug={p.slug}
              author={p.slug}
              description={p.description}
              featuredImage={p.featuredImage}
              gallery={p.gallery}
              category={p.category}
              tags={p.tags}
              published={p.published}
              timestamp={p.timestamp}
            />
        )}
      </div>
    );
  }
}

ProductListContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    published: PropTypes.bool.isRequired,
    timestamp: PropTypes.string.isRequired
  }).isRequired).isRequired
}

function mapStateToProps(state) {
  return {
    products: state.products.allProducts.products
  }
}

export default connect(mapStateToProps)(ProductListContainer);