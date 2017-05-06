import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/announcements';
import Announcement from './Announcement';

class AnnouncementList extends Component {
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
          />
        )}
      </div>
    );
  }
}

AnnouncementList.propTypes = {
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

function mapDispatchToProps(dispatch) {
  dispatch(actions.fetchAnnouncements())
}

const FullAnnouncementList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouncementList)


export default FullAnnouncementList;
