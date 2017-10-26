import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchServices } from 'sdb-redux';
import { Service } from 'components/Service';

class ServiceList extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchServices());
  }

  render() {
    const { services } = this.props;

    if (!services) {
      return <h1>Loading...</h1>
    }

    return (
      <div className='container-fluid'>
        {services.map(node =>
          <Service key={node._id} service={node} />
        )}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  services: state.services.services
});


export default connect(mapStateToProps)(ServiceList);