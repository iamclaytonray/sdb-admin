import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  {
    medias {
      createdAt
      title
      slug
      featuredImage
      published
    }
  }
`;

export const AllMediasPage = () => {
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
            data={data.medias}
            title="Media"
            location="/dashboard/media/new"
          >
            New Media
          </SharedTable>
        );
      }}
    </Query>
  );
};
