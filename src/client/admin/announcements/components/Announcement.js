import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Announcement extends Component {
  render() {
    const { _id, title, slug, featuredImage, content } = this.props;
    return (
      <div className="main-container">
        <div className="posts">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3">
                <Link to={`admin/announcements/${slug}`}><p>{title}</p></Link>
                <img src={featuredImage} />
                <p className="content">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Announcement.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
}

export default Announcement;