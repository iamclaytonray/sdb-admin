import { TableBody } from 'components/Table/TableBody';
import { TableColumn } from 'components/Table/TableColumn';
import { TableRow } from 'components/Table/TableRow';
import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const Article = ({ article }) => {
  return (
    <TableBody>
      <TableRow>
        <TableColumn>
          <img
            src={article.featuredImage}
            className="img-fluid"
            style={{ height: 50, width: 'auto' }}
          />
        </TableColumn>
        <TableColumn>
          <Link to={`articles/${article.slug}`}>{article.title}</Link>
        </TableColumn>
        <TableColumn>
          <Link to={`articles/${article.slug}`}>{article.slug}</Link>
        </TableColumn>
        <TableColumn>{article.published.toString()}</TableColumn>
        <TableColumn>
          {moment(article.createdAt).format('MM-DD-YY')}
        </TableColumn>
      </TableRow>
    </TableBody>
  );
};
