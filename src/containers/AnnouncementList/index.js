import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAnnouncements } from 'sdb-redux';
import { Announcement } from 'components/Announcement';

class AnnouncementList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAnnouncements())
  }
  render() {
    return (
      <div>
        {this.props.announcements.map(node =>
          <Announcement key={node._id} announcement={node} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  announcements: state.announcements.announcements
});

export default connect(mapStateToProps)(AnnouncementList);