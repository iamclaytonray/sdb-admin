import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/services';
import Service from '../components/Service';

class ServiceListContainer extends Component {

  componentDidMount() {
    this.props.dispatch(actions.fetchServices()); 
  }

  render() {
    return (
      <div>
        {this.props.services.map(s =>
          <div className="col-lg-4">
            <Service
              key={s._id}
              title={s.title}
              slug={s.slug}
              featuredImage={s.featuredImage}
              videoUri={s.videoUri}
              author={s.author}
              content={s.content}
              category={s.category}
            />
          </div>
        )}
      </div>
    );
  }
}

ServiceListContainer.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired,
    videoUri: PropTypes.string,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired).isRequired
}

function mapStateToProps(state) {
  return {
    services: state.services.allServices.services
  }
}

export default connect(mapStateToProps)(ServiceListContainer);