import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from 'sdb-redux';
import { Product } from 'components/Product';

class ProductList extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }

  render() {

    const { products } = this.props;

    if (!products) {
      return (
        <h1>No Products...</h1>
      );
    }

    return (
      <div className='container-fluid'>
        {products.map(node =>
          <Product key={node._id} product={node} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products
});

export default connect(mapStateToProps)(ProductList);