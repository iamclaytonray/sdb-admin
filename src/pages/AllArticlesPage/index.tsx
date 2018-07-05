import { ArticlesTable } from 'components/ArticlesTable';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
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
          <ArticlesTable
            data={data.articles}
            title="Articles"
            location="/dashboard/articles/new"
          >
            New Article
          </ArticlesTable>
        );
      }}
    </Query>
  );
};
