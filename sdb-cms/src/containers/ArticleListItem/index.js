import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticle } from 'sdb-redux';
import { Article } from 'components/Article';

class SinglePost extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchArticle(match.params.slug))
  }

  render() {
    const { article } = this.props;
    return (
      <div className="container">
        <div className="col-lg-8 col-lg-offset-2">
          <div className="row">
            {article.title}
            <button>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  article: state.articles.article
});

export default connect(mapStateToProps)(ArticleListItem);