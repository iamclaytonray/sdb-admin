import React from 'react';
import { Link } from 'react-router-dom';

export const Product = ({ product }) => {
  return (
    <div className='col-md-6 col-lg-offset-3'>
      <Link to={`/products/${product.slug}`}>
        { product.name }
      </Link>
    </div>
  );
}