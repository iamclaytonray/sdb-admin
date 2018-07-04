import { Error } from 'components/Error';
// import { NewButton } from 'components/NewButton';
import { EventsTable } from 'components/EventsTable';
import { Loading } from 'components/Loading';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  {
    events {
      createdAt
      title
      slug
      featuredImage
      published
    }
  }
`;

export const AllEventsPage = () => {
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
          <EventsTable
            data={data.events}
            title="Events"
            location="/dashboard/events/new"
          >
            New Event
          </EventsTable>
        );
      }}
    </Query>
  );
};
