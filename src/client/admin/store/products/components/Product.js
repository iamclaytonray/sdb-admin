import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Product extends Component {
  render() {
    const { _id, title, slug, author, description, featuredImage, gallery, category, tags, published, timestamp } = this.props;
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="product-list">
              <div className="product-card">
                <Link to={`admin/store/products/${slug}`}>
                  <img src={featuredImage} />
                  <div className="product-card-content">
                    <h3>{title}</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Product.propTypes = {
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

export default Product;