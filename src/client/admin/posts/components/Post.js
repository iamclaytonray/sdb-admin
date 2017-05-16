import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Post extends Component {
  render() {
    const { title, slug, featuredImage, author, excerpt, content, category, tags, timestamp } = this.props;
    return (
      <div>
        <Link to={`admin/posts/${slug}`}>
          <img src={featuredImage} />
          <div className="content">
            <h2>{title}</h2>
            <p className="author">{author} | <span className="date">{timestamp}></span></p>
            <p className="category">{category}</p>
            <p className="excerpt">{excerpt}</p>
          </div>
        </Link>
      </div>
    );
  }
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