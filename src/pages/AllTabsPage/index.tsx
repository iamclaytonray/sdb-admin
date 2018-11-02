import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
import { API_URL } from '../../constants';

export class AllTabsPage extends React.Component {
  public state = {
    tabs: [],
    error: null,
    loading: true,
  };
  public render() {
    return (
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
              location="/dashboard/menu-items/new"
              otherLocation="menu-items"
              children="New Menu Item"
            />
          );
        }}
      </Fetch>
    );
  }
}
