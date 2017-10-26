import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
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
      <div className='service'>
        <iframe width="853" height="480" src={`${service.videoUri}?rel=0&amp;showinfo=0`} title={service.title} frameBorder='0' allowFullScreen />
        <div className='content'>
          <h1>{service.title}</h1>
          <p>{ ReactHtmlParser(service.content) }</p>
          <Link to='/services/categories'>{service.category}</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  service: state.services.service
});

export default connect(mapStateToProps)(ServiceListItem);