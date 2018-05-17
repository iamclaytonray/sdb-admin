import { Article } from 'components/Article';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { NewButton } from 'components/NewButton';
import { Table } from 'components/Table/Table';
import { TableBody } from 'components/Table/TableBody';
import { TableHead } from 'components/Table/TableHead';
import { TableRow } from 'components/Table/TableRow';
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
    <div>
      <NewButton location="/dashboard/articles/new">New Article</NewButton>
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }

          return (
            <Table className="table table-hover">
              <TableBody>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableBody>
              {data.articles.map(article => (
                <Article key={article.slug} article={article} />
              ))}
            </Table>
          );
        }}
      </Query>
    </div>
  );
};
