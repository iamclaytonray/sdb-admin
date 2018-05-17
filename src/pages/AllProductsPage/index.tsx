import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { NewButton } from 'components/NewButton';
import { Product } from 'components/Product';
import { Table } from 'components/Table/Table';
import { TableBody } from 'components/Table/TableBody';
import { TableHead } from 'components/Table/TableHead';
import { TableRow } from 'components/Table/TableRow';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  {
    products {
      createdAt
      name
      slug
      featuredImage
      published
    }
  }
`;

export const AllProductsPage = () => {
  return (
    <div>
      <NewButton location="/dashboard/products/new">New Product</NewButton>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableBody>
              {data.products.map(product => (
                <Product key={product.slug} product={product} />
              ))}
            </Table>
          );
        }}
      </Query>
    </div>
  );
};
