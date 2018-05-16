import { TableBody } from 'components/Table/TableBody';
import { TableColumn } from 'components/Table/TableColumn';
import { TableRow } from 'components/Table/TableRow';
import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const Media = ({ media }) => {
  return (
    <TableBody>
      <TableRow>
        <TableColumn>
          <img
            src={media.featuredImage}
            className="img-fluid"
            style={{ height: 50, width: 'auto' }}
          />
        </TableColumn>
        <TableColumn>
          <Link to={`medias/${media.id}`}>{media.title}</Link>
        </TableColumn>
        <TableColumn>
          <Link to={`medias/${media.id}`}>{media.id}</Link>
        </TableColumn>
        <TableColumn>{media.published.toString()}</TableColumn>
        <TableColumn>{moment(media.createdAt).format('MM-DD-YY')}</TableColumn>
      </TableRow>
    </TableBody>
  );
};
