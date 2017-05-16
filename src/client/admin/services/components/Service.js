import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Service extends Component {
  render() {
    const { title, slug, featuredImage, videoUri, author, content, category, timestamp } = this.props;
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="service-list">
              <div className="service-card">
                <Link to={`/admin/services/${slug}`}>
                  <img className="img-hover" src={featuredImage} />
                  <div className="service-card-content">
                    <h2>{title}</h2>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


Service.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  videoUri: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
}

export default Service;