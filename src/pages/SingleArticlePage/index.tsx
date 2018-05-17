import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { DeleteContainer } from 'containers/DeleteContainer';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  query article($slug: String!) {
    article(where: { slug: $slug }) {
      title
      slug
      featuredImage
      content
      published
      link
      category
    }
  }
`;

const deleteArticleMutation = gql`
  mutation deleteArticle($slug: String!) {
    deleteArticle(where: { slug: $slug }) {
      id
    }
  }
`;

export const SingleArticlePage = ({ match, history }) => {
  return (
    <Query query={query} variables={{ slug: match.params.slug }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <Error error={error} />;
        }

        const { article } = data;

        return (
          <React.Fragment>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={article.title}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                value={article.slug}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <br />
              <img
                src={article.featuredImage}
                style={{ height: 100, width: 'auto' }}
              />
              <p />
              <input
                name="featuredImage"
                type="text"
                value={article.featuredImage}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                name="category"
                type="text"
                value={article.category}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Link</label>
              <input
                name="link"
                type="text"
                value={article.link}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Published</label>
              <input
                name="published"
                type="checkbox"
                checked={article.published}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                value={article.content}
                className="form-control"
                rows={10}
              />
            </div>

            <button className="btn btn-primary">Update</button>
            <DeleteContainer
              mutationName={deleteArticleMutation}
              variable={article.slug}
              history={history}
            />
          </React.Fragment>
        );
      }}
    </Query>
  );
};
