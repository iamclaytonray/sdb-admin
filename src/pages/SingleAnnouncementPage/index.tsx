import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { DeleteContainer } from 'containers/DeleteContainer';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  query announcement($slug: String!) {
    announcement(where: { slug: $slug }) {
      title
      slug
      content
      featuredImage
      published
    }
  }
`;

const deleteAnnouncementMutation = gql`
  mutation deleteAnnouncement($slug: String!) {
    deleteAnnouncement(where: { slug: $slug }) {
      id
    }
  }
`;

export const SingleAnnouncementPage = ({ match, history }) => {
  return (
    <Query query={query} variables={{ slug: match.params.slug }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <Error error={error} />;
        }

        const { announcement } = data;

        return (
          <React.Fragment>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={announcement.title}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                value={announcement.slug}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <br />
              <img
                src={announcement.featuredImage}
                style={{ height: 100, width: 'auto' }}
              />
              <p />
              <input
                name="featuredImage"
                type="text"
                value={announcement.featuredImage}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Published</label>
              <input
                name="published"
                type="checkbox"
                checked={announcement.published}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                value={announcement.content}
                className="form-control"
                rows={10}
              />
            </div>

            <button className="btn btn-primary">Update</button>
            <DeleteContainer
              mutationName={deleteAnnouncementMutation}
              variable={announcement.slug}
              history={history}
            />
          </React.Fragment>
        );
      }}
    </Query>
  );
};
