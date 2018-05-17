import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { DeleteContainer } from 'containers/DeleteContainer';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  query product($slug: String!) {
    product(where: { slug: $slug }) {
      name
      slug
      featuredImage
      description
      storeLink
      price
      published
      # content
    }
  }
`;

const deleteProductMutation = gql`
  mutation deleteProduct($slug: String!) {
    deleteProduct(where: { slug: $slug }) {
      id
    }
  }
`;

export const SingleProductPage = ({ match, history }) => {
  return (
    <Query query={query} variables={{ slug: match.params.slug }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <Error error={error} />;
        }

        const { product } = data;

        return (
          <React.Fragment>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={product.name}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                value={product.slug}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <br />
              <img
                src={product.featuredImage}
                style={{ height: 100, width: 'auto' }}
              />
              <p />
              <input
                name="featuredImage"
                type="text"
                value={product.featuredImage}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                name="description"
                type="text"
                value={product.description}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Store Link</label>
              <input
                name="storeLink"
                type="text"
                value={product.storeLink}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                name="price"
                type="text"
                value={product.price}
                className="form-control"
              />
            </div>

            {/* Fix onChange */}
            <div className="form-group">
              <label>Published</label>
              <input
                name="published"
                type="checkbox"
                checked={product.published}
                className="form-control"
              />
            </div>

            {/* <div className="form-group">
              <label>Content</label>
              <textarea
                value={product.content}
                className="form-control"
                rows={10}
              />
            </div> */}

            <button className="btn btn-primary">Update</button>
            <DeleteContainer
              mutationName={deleteProductMutation}
              variable={product.slug}
              history={history}
            />
          </React.Fragment>
        );
      }}
    </Query>
  );
};
