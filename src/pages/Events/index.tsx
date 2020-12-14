import { Paper, Tab, Tabs } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import * as React from 'react';
import { Col, Row } from 'react-grid-system';
import { useHistory, } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { Loading } from '../../components/Loading';
import { columns } from '../../components/SharedTable/columns';
import { Api } from '../../utils/Api';
import { OrderItems } from '../OrderItems';

export const Events = () => {
  const history = useHistory();

  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const { error, data } = await Api.getEvents();

    if (error) {
      setIsLoading(false);
      return;
    }

    setEvents(data);
    setIsLoading(false);
  };

  const toggle = () => {
    const newTab = tab === 0 ? 1 : 0;
    setTab(newTab);
  };

  const handleClick = (row: any) => {
    const [id] = row;
    history.push(`/dashboard/events/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title="Events">
      <div>
        <Paper square style={{ marginBottom: 24 }}>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={toggle}
          >
            <Tab label="Table" />
            <Tab label="Order" />
          </Tabs>
        </Paper>
        {tab === 0 && (
          <div>
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  title="Data"
                  data={events}
                  columns={columns.events.columns}
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
                            history.push(`/dashboard/events/new`)
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
        )}
        {tab === 1 && <OrderItems resource="events" data={events} />}
      </div>
    </Layout>
  );
};
