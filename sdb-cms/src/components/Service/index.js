import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

export const Service = ({ service }) => {
  return (
    <div className='col-md-3'>
      <div className='card'>
        <Link to={`services/${service.slug}`}>
          <img src={service.featuredImage} alt={service.title} />
          <div className='details'>
            <p className='title'>{ ReactHtmlParser(service.title) }</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
