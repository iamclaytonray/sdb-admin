import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Service from './Service';
import * as actions from '../../../redux/actions/services';

class SingleService extends Component {  
  render() {
    const { _id, title, slug, author, featuredImage, videoUri, content, categories, published timestamp } = this.props.service;
    return (
      <div>
        <form>
          <input className="form-control" type="text" name="title" value={title} />
          <p>{_id}</p>
          <p>{title}</p>
          <p>{slug}</p>
          <p>{content}</p>
          <p>{videoUri}</p>
          <p>{published}</p>
          <img src={featuredImage} />
          <p>{timestamp}</p>
        </form>
      </div>
    );
  }
}


SingleService.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    service: state.services.singleService.service
  }
}

function mapDispatchToProps(dispatch, props) {
  dispatch(actions.fetchService(props.params.slug));
}


const FullSingleService = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleService)


export default FullSingleService;