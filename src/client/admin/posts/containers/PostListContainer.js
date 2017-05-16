import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/posts';
import Post from '../components/Post';
import NoPost from '../components/NoPost';

class PostListContainer extends Component {
  
  componentDidMount() {
    this.props.dispatch(actions.fetchPosts()); 
  }

  render() {
    
    if (this.props.posts.length === 0) {
      return ( <NoPost /> );
    }

    return (
      <div>
        {this.props.posts.map(post =>
          <div className="container-fluid">
            <div className="col-lg-6">
              <div className="row">
                <div className="post-list">
                  <div className="post-card">
                    <Post
                      key={post._id}
                      author={post.author}
                      title={post.title}
                      slug={post.slug}
                      featuredImage={post.featuredImage}
                      excerpt={post.excerpt}
                      content={post.content}
                      category={post.category}
                      tags={post.tags}
                      timestamp={post.timestamp}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

PostListContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    timestamp: PropTypes.string
  }).isRequired).isRequired
}

function mapStateToProps(state) {
  return {
    posts: state.posts.allPosts.posts
  }
}


export default connect(mapStateToProps)(PostListContainer);