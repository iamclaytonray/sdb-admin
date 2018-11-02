import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
import { API_URL } from '../../constants';

export class AllEventsPage extends React.Component<any, any> {
  public render() {
    return (
      <Fetch url={`${API_URL}/events`} method="GET" lifecycle="onMount">
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }
          const events = data.data;
          return (
            <SharedTable
              data={events}
              title="Events"
              location="/dashboard/events/new"
              otherLocation="events"
              children="New Event"
            />
          );
        }}
      </Fetch>
    );
  }
}
