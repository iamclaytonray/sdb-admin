import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
import { API_URL } from '../../constants';

export class AllProductsPage extends React.Component<any, any> {
  public render() {
    return (
      <Fetch url={`${API_URL}/products`} method="GET" lifecycle="onMount">
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }
          const products = data.data;
          return (
            <SharedTable
              data={products}
              title="Product"
              location="/dashboard/products/new"
              otherLocation="products"
              children="New Product"
            />
          );
        }}
      </Fetch>
    );
  }
}
