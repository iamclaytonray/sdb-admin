import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import * as React from 'react';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';

import { columns } from './columns';

export const SharedTable = (props: any) => {
  const history = useHistory();

  const handleClick = (row: any) => {
    const [id] = row;
    history.push(`/dashboard/${props.resource}/${id}`);
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
              selectableRows: 'none',
              print: false,
              download: false,
              searchOpen: true,
              onRowClick: handleClick,
              customToolbar: () => {
                return (
                  <IconButton
                    onClick={() =>
                      history.push(`/dashboard/${props.resource}/new`)
                    }
                  >
                    <Add />
                  </IconButton>
                );
              },
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
