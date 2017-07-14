import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Product from './Product';
import * as actions from '../../../../redux/actions/products';

class SingleProduct extends Component {  
  render() {
    const { title, slug, description, featuredImage, category, timestamp } = this.props.product;
    return (
      <div style={{marginTop: 50}}>
        <div className="container">
          <div className="col-lg-12">
            <div className="row">
              <div className="product">
                <p className="top-margin"></p>
              <h1 className="title">{title}</h1>
              <p></p>
              <img src={featuredImage} />
              <p className="author">{timestamp}</p>
              <p className="content">{description}</p>
              <Link to="/store/products">Back To Products</Link>
              <p className="bottom-margin"></p>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}


SingleProduct.propTypes = {
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
}

function mapStateToProps(state) {
  return {
    product: state.products.singleProduct.product
  }
}

function mapDispatchToProps(dispatch, props) {
  dispatch(actions.fetchProduct(props.params.slug));
}


const FullSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)


export default FullSingleProduct;