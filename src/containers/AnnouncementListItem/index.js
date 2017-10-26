import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAnnouncement } from 'sdb-redux';

import { Announcement } from 'components/Announcement';

class AnnouncementListItem extends Component {  
  
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchAnnouncement(match.params.slug));
  }

  render() {
    const { announcement } = this.props;
    return (
      <div>
        <p>{announcement._id}</p>
        <p>{announcement.title}</p>
        <p>{announcement.slug}</p>
        <p>{announcement.content}</p>
        <img src={announcement.featuredImage} />
        <p>{announcement.timestamp}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  announcements: state.announcements.announcement
});

export default connect(mapStateToProps)(AnnouncementListItem);