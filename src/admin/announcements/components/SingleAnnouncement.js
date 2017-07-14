import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Announcement from './Announcement';
import * as actions from '../../../redux/actions/announcements';

class SingleAnnouncement extends Component {  
  
  componentWillMount() {
    this.props.dispatch(actions.fetchAnnouncement(this.props.params.slug));
  }

  render() {
    const { _id, title, slug, content, featuredImage, timestamp } = this.props.announcement;
    return (
      <div>
        <p>{_id}</p>
        <p>{title}</p>
        <p>{slug}</p>
        <p>{content}</p>
        <img src={featuredImage} />
        <p>{timestamp}</p>
      </div>
    );
  }
}


SingleAnnouncement.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    announcement: state.announcements.singleAnnouncement.announcement
  }
}

export default connect(mapStateToProps)(SingleAnnouncement);