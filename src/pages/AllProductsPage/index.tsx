import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { ProductsTable } from 'components/ProductsTable';
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
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <Error error={error} />;
        }

        return (
          <ProductsTable
            data={data.products}
            title="Products"
            location="/dashboard/products/new"
          >
            New Product
          </ProductsTable>
        );
      }}
    </Query>
  );
};
