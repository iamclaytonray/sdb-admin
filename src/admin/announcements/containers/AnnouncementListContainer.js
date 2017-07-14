import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/announcements';
import Announcement from '../components/Announcement';

class AnnouncementListContainer extends Component {
  
  componentWillMount() {
    this.props.dispatch(actions.fetchAnnouncements())
  }

  render() {
    return (
      <div>
        {this.props.announcements.map(a =>
          <Announcement
            key={a._id}
            title={a.title}
            slug={a.slug}
            content={a.content}
            featuredImage={a.featuredImage}
            timestamp={a.timestamp}
            from={a.dates.from}
            to={a.dates.to}
          />
        )}
      </div>
    );
  }
}

AnnouncementListContainer.propTypes = {
  announcements: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
  }).isRequired).isRequired
}

function mapStateToProps(state) {
  return {
    announcements: state.announcements.allAnnouncements.announcements
  }
}

export default connect(mapStateToProps)(AnnouncementListContainer);