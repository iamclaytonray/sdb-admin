import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Announcement = props => {
  return (
    <div>
      <tr>
        <td><Link to={`admin/announcements/${slug}`}>{title}</Link></td>
        <td>{timestamp}</td>
      </tr>
    </div>
  );
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