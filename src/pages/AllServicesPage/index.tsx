import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  {
    services {
      createdAt
      title
      slug
      featuredImage
      published
    }
  }
`;

export const AllServicesPage = () => {
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
            data={data.services}
            title="Services"
            location="/dashboard/services/new"
          >
            New Service
          </SharedTable>
        );
      }}
    </Query>
  );
};