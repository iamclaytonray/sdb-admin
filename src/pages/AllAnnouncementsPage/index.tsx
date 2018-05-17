import { Announcement } from 'components/Announcement';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { NewButton } from 'components/NewButton';
import { Table } from 'components/Table/Table';
import { TableBody } from 'components/Table/TableBody';
import { TableHead } from 'components/Table/TableHead';
import { TableRow } from 'components/Table/TableRow';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  {
    announcements {
      createdAt
      title
      slug
      featuredImage
      published
    }
  }
`;

export const AllAnnouncementsPage = () => {
  return (
    <div>
      <NewButton location="/dashboard/announcements/new">
        New Announcement
      </NewButton>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableBody>
              {data.announcements.map(announcement => (
                <Announcement
                  key={announcement.slug}
                  announcement={announcement}
                />
              ))}
            </Table>
          );
        }}
      </Query>
    </div>
  );
};
