import React from 'react';
import { Link } from 'react-router-dom';

export const Service = ({ service }) => {
  return (
    <div className='col-lg-6 col-lg-offset-3'>
      <Link to={`services/${service.slug}`}>
        {service.title}
      </Link>
    </div>
  );
}
