import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
import { API_URL } from '../../constants';

export const AllServicesPage = () => {
  const size = 100;
  const page = 1;
  return (
    <Fetch
      url={`${API_URL}/services?page=${page}&size=${size}`}
      method="GET"
      lifecycle="onMount"
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <Error error={error} />;
        }
        const services = data.data;
        return (
          <SharedTable
            data={services}
            title="Service"
            location="/dashboard/services/new"
            otherLocation="services"
            children="New Service"
          />
        );
      }}
    </Fetch>
  );
};
