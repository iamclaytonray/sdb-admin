import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAnnouncement } from 'sdb-redux';

class AnnouncementListItem extends Component {  
  
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchAnnouncement(match.params.slug));
  }

  render() {
    const { announcement } = this.props;
    return (
      <div>
        {announcement.title}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  announcements: state.announcements.announcement
});

export default connect(mapStateToProps)(AnnouncementListItem);