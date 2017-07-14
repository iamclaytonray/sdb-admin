import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/posts';
import Post from './Post';
import EditPostForm from '../containers/EditPostForm';

class SinglePost extends Component {

  constructor(props) {
    super(props);
  }
  
  submit = (values) => {
    console.log(values);
  } 

  handleDeletePost = post => {
    this.props.dispatch(deletePost(this.props.params.slug));
  };

  render() {
    const { author, title, slug, content, featuredImage, category, timestamp } = this.props.post;
    const { handleSubmit } = this.props;
    return (
      <div style={{marginTop: 50}}>
        <div className="container">
          <div className="col-lg-8 col-lg-offset-2">
            <div className="row">
              
              <EditPostForm
                title={this.props.post.title}
                content={this.props.post.content}
                featuredImage={this.props.post.featuredImage}
                onSubmit={this.submit.bind(this)}
              />

              <p><button onClick={this.props.onDelete}>Delete</button></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


SinglePost.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  timestamp: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    post: state.posts.singlePost.post
  }
}

function mapDispatchToProps(dispatch, props) {
  dispatch(actions.fetchPost(props.params.slug));
}


const FullSinglePost = connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost)


export default FullSinglePost;