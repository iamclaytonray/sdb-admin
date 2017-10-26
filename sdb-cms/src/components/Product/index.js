import React from 'react';
import { Link } from 'react-router-dom';

export const Product = ({ product }) => {
  return (
    <div className='col-md-3'>
      <div className='product-card'>
        <Link to={product.storeLink} target='_blank'>
          <img src={product.featuredImage} alt={product.title} />
          <div className='details'>
            <p className='title'>{product.name}</p>
            <p>${product.price}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}