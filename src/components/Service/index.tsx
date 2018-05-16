import { TableBody } from 'components/Table/TableBody';
import { TableColumn } from 'components/Table/TableColumn';
import { TableRow } from 'components/Table/TableRow';
import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const Service = ({ service }) => {
  return (
    <TableBody>
      <TableRow>
        <TableColumn>
          <img
            src={service.featuredImage}
            className="img-fluid"
            style={{ height: 50, width: 'auto' }}
          />
        </TableColumn>
        <TableColumn>
          <Link to={`services/${service.slug}`}>{service.title}</Link>
        </TableColumn>
        <TableColumn>
          <Link to={`services/${service.slug}`}>{service.slug}</Link>
        </TableColumn>
        <TableColumn>{service.published.toString()}</TableColumn>
        <TableColumn>
          {moment(service.createdAt).format('MM-DD-YY')}
        </TableColumn>
      </TableRow>
    </TableBody>
  );
};
