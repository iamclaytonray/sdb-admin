import MUIDataTable from 'mui-datatables';
import * as React from 'react';
import { Col, Row } from 'react-grid-system';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectSermon } from '../../store/actions/sermons';

import { columns } from './columns';

export const SharedTable = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (row?: any) => {
    const [title, slug, cat] = row;
    console.log(title, cat);
    const data = props.data.find((node: any) => node.slug === slug);
    dispatch(selectSermon(data.id));
    history.push(`/dashboard/${props.resource}/${slug}`);
  };

  return (
    <div>
      <Row>
        <Col lg={12}>
          <MUIDataTable
            title="Data"
            data={props.data}
            columns={columns[props.resource].columns}
            options={{
              print: false,
              download: false,
              onRowClick: handleClick,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
