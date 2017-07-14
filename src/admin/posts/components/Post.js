import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';


const Post = props => {
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
          <Link to={`admin/posts/${props.slug}`}>
          <tbody>
            <tr>
              <td>{props.title}</td>
              <td>{props.author}</td>
              <td>{props.timestamp}</td>
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


Post.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  timestamp: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
}

export default Post;