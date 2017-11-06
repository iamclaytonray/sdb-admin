import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchService } from 'sdb-redux';

class ServiceListItem extends Component {
  
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchService(match.params.slug));
  }

  render() {
    const { service } = this.props;
    
    if (!service) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className='col-lg-6 col-lg-offset-3' style={{ textAlign: 'center' }}>
        <form>
          <input type='text' className='form-control' value={service.title} />
          <input type='text' className='form-control' value={service.slug} />
          <input type='text' className='form-control' value={service.featuredImage} />
          <input type='text' className='form-control' value={service.tags} />
          <input type='text' className='form-control' value={service.videoUri} />
          <input type='text' className='form-control' value={service.category} />
          <input type='text' className='form-control' value={service.content} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  service: state.services.service
});

export default connect(mapStateToProps)(ServiceListItem);