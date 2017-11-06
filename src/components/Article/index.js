import React from 'react';
import { Link } from 'react-router-dom';


export const Article = ({ article }) => {
  return (
    <div className='post-list'>
      <Link to={`/articles/${article.slug}`}>
        {article.title}
      </Link>
    </div>
  );
}