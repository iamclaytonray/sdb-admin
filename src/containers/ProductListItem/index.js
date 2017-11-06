import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from 'sdb-redux';

class ProductListItem extends Component {  
  
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchProduct(match.params.slug));
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className='col-lg-6 col-lg-offset-3'>
        <input className='form-control' value={product.name} />
        <input className='form-control' value={product.price} />
        <input className='form-control' value={product.featuredImage} />
        <input className='form-control' value={product.slug} />
        <input className='form-control' value={product.storeLink} />
        <textarea className='form-control' value={product.description} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product
});


export default connect(mapStateToProps)(ProductListItem);