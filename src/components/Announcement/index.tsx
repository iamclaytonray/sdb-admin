import { TableBody } from 'components/Table/TableBody';
import { TableColumn } from 'components/Table/TableColumn';
import { TableRow } from 'components/Table/TableRow';
import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const Announcement = ({ announcement }) => {
  return (
    <TableBody>
      <TableRow>
        <TableColumn>
          <img
            src={announcement.featuredImage}
            className="img-fluid"
            style={{ height: 50, width: 'auto' }}
          />
        </TableColumn>
        <TableColumn>
          <Link to={`announcements/${announcement.slug}`}>
            {announcement.title}
          </Link>
        </TableColumn>
        <TableColumn>
          <Link to={`announcements/${announcement.slug}`}>
            {announcement.slug}
          </Link>
        </TableColumn>
        <TableColumn>{announcement.published.toString()}</TableColumn>
        <TableColumn>
          {moment(announcement.createdAt).format('MM-DD-YY')}
        </TableColumn>
      </TableRow>
    </TableBody>
  );
};
