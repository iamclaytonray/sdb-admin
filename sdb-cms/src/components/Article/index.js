import React from 'react';
import { Link } from 'react-router-dom';


export const Article = ({ article }) => {
  return (
    <div className='post-list'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <Link to={`admin/posts/${article.slug}`}>
          <tbody>
            <tr>
              <td>{article.title}</td>
              <td>{article.author}</td>
              <td>{prarticleops.timestamp}</td>
            </tr>
          </tbody>
          </Link>
        </table>
        {/*<table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>*/}
    </div>
  );
}