import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
import { API_URL } from '../../constants';

export const AllJewishPage = () => (
  <Fetch url={`${API_URL}/jewish`} method="GET" lifecycle="onMount">
    {({ loading, error, data }) => {
      if (loading) {
        return <Loading />;
      }
      if (error) {
        return <Error error={error} />;
      }
      const jewish = data.data;
      return (
        <SharedTable
          data={jewish}
          title="Jewish"
          location="/dashboard/jewish/new"
          otherLocation="jewish"
          children="New Jewish"
        />
      );
    }}
  </Fetch>
);
