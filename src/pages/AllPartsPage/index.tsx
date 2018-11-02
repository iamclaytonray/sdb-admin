import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
import { API_URL } from '../../constants';

export class AllPartsPage extends React.Component<any, any> {
  public state = {
    parts: [],
    error: null,
    loading: true,
  };
  public render() {
    return (
      <Fetch url={`${API_URL}/parts`} method="GET" lifecycle="onMount">
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }
          const parts = data.data;
          return (
            <SharedTable
              data={parts}
              title="Part"
              location="/dashboard/parts/new"
              otherLocation="parts"
              children="New Part"
            />
          );
        }}
      </Fetch>
    );
  }
}
