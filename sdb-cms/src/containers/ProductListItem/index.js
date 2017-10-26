import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from 'sdb-redux';

class SingleProduct extends Component {  
  
  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchProduct(params.slug));
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <div className='gap-md'></div>
        <div className='row'>
          <div className='col-md-4'>
            <img src={product.featuredImage} alt={product.name} />
          </div>
          <div className='col-lg-6'>
            <div className='product-meta'>
              <h1>{product.name}</h1>
              <p>${product.price}</p>
              <i className='fa fa-heart-o fa-lg'></i>
            </div>
          </div>
        </div>
        <div className='row center-sm'>
          <div className='col-sm-10'>
            <div className='box'>
              <div className='product-details'>
                <div className='product-content'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product
});


export default connect(mapStateToProps)(SingleProduct);