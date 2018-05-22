import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
// import { NewButton } from 'components/NewButton';
import { SharedTable } from 'components/SharedTable';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  {
    announcements {
      createdAt
      title
      slug
      featuredImage
      published
    }
  }
`;

export const AllAnnouncementsPage = () => {
  return (
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <Error error={error} />;
        }

        return (
          <SharedTable
            data={data.announcements}
            title="Announcements"
            location="/dashboard/announcements/new"
          >
            New Announcement
          </SharedTable>
        );
      }}
    </Query>
  );
};
