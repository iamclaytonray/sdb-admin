import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from 'sdb-redux';
import { Article } from 'components/Article';

class ArticleList extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchArticles()); 
  }

  render() {
    return (
      <div>
        {this.props.articles.map(node =>
          <Article key={node._id} article={node} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles.articles
});

export default connect(mapStateToProps)(ArticleList);