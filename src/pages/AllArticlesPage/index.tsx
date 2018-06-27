import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  {
    articles {
      createdAt
      title
      slug
      featuredImage
      published
    }
  }
`;

export const AllArticlesPage = () => {
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
            data={data.articles}
            title="Articles"
            location="/dashboard/articles/new"
          >
            New Article
          </SharedTable>
        );
      }}
    </Query>
  );
};
