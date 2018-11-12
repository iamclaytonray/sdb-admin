import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
import { API_URL } from '../../constants';

export const AllTabsPage = () => (
  <Fetch url={`${API_URL}/tabs`} method="GET" lifecycle="onMount">
    {({ loading, error, data }) => {
      if (loading) {
        return <Loading />;
      }
      if (error) {
        return <Error error={error} />;
      }
      const tabs = data.data;
      return (
        <SharedTable
          data={tabs}
          title="Menu Item"
          location="/dashboard/tabs/new"
          otherLocation="tabs"
          children="New Menu Item"
        />
      );
    }}
  </Fetch>
);
