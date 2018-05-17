import { TableBody } from 'components/Table/TableBody';
import { TableColumn } from 'components/Table/TableColumn';
import { TableRow } from 'components/Table/TableRow';
import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';

// className="col-md-6 col-lg-offset-3"

export const Product = ({ product }) => {
  return (
    <TableBody>
      <TableRow>
        <TableColumn>
          <img
            src={product.featuredImage}
            className="img-fluid"
            style={{ height: 50, width: 'auto' }}
          />
        </TableColumn>
        <TableColumn>
          <Link to={`products/${product.slug}`}>{product.name}</Link>
        </TableColumn>
        <TableColumn>
          <Link to={`products/${product.slug}`}>{product.slug}</Link>
        </TableColumn>
        <TableColumn>{product.published.toString()}</TableColumn>
        <TableColumn>
          {moment(product.createdAt).format('MM-DD-YY')}
        </TableColumn>
      </TableRow>
    </TableBody>
  );
};
