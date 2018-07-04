import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { DeleteContainer } from 'containers/DeleteContainer';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Card, CardBody } from 'reactstrap';

const query = gql`
  query event($slug: String!) {
    event(where: { slug: $slug }) {
      title
      slug
      content
      featuredImage
      published
    }
  }
`;

const deleteEventMutation = gql`
  mutation deleteEvent($slug: String!) {
    deleteEvent(where: { slug: $slug }) {
      id
    }
  }
`;

export const SingleEventPage = ({ match, history }) => {
  return (
    <Query query={query} variables={{ slug: match.params.slug }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <Error error={error} />;
        }

        const { event } = data;

        return (
          <Card>
            <CardBody>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={event.title}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Slug</label>
                <input
                  type="text"
                  value={event.slug}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Featured Image</label>
                <br />
                <img
                  src={event.featuredImage}
                  style={{ height: 100, width: 'auto' }}
                />
                <p />
                <input
                  name="featuredImage"
                  type="text"
                  value={event.featuredImage}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Published</label>
                <input
                  name="published"
                  type="checkbox"
                  checked={event.published}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={event.content}
                  className="form-control"
                  rows={10}
                />
              </div>

              <button className="btn btn-primary">Update</button>
              <DeleteContainer
                mutationName={deleteEventMutation}
                variable={event.slug}
                history={history}
              />
            </CardBody>
          </Card>
        );
      }}
    </Query>
  );
};
