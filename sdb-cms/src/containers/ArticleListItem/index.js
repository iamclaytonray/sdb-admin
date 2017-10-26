import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticle } from 'sdb-redux';

class ArticleListItem extends Component {

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