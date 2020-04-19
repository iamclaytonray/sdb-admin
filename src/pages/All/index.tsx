import { Paper, Tab, Tabs } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { SharedTable } from '../../components/SharedTable';
import { API_URL } from '../../constants';
import { loadEvents } from '../../store/actions/events';
import { loadResources } from '../../store/actions/resources';
import { loadSermons } from '../../store/actions/sermons';
import { OrderItems } from '../OrderItems';

export const All = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const events = useSelector((s: any) => s.events.allEvents);
  const resources = useSelector((s: any) => s.resources.allResources);
  const sermons = useSelector((s: any) => s.sermons.allSermons);
  const [tab, setTab] = React.useState(0);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch();
  },              []);

  React.useEffect(() => {
    if (props.resource === 'events') {
      setData(Object.values(events || {}));
    }
    if (props.resource === 'resources') {
      setData(Object.values(resources || {}));
    }
    if (props.resource === 'sermons') {
      setData(Object.values(sermons || {}));
    }
  },              [events, resources, sermons, props.resource]);

  React.useEffect(() => {
    setTab(0);
    fetch();

    return () => setTab(0);
  },              [location]);

  const fetch = async () => {
    try {
      const res = await Axios.get(`${API_URL}/${props.resource}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        } as any,
      });
      if (props.resource === 'events') {
        dispatch(loadEvents(res.data.data));
      }
      if (props.resource === 'resources') {
        dispatch(loadResources(res.data.data));
      }
      if (props.resource === 'sermons') {
        dispatch(loadSermons(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = () => {
    const newTab = tab === 0 ? 1 : 0;
    setTab(newTab);
  };

  if (!data) {
    return 'loading';
  }

  return (
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
        <SharedTable
          data={
            data.length > 0
              ? data.sort((a: any, b: any) => a.order - b.order)
              : data
          }
          title={props.title}
          resource={props.resource}
          {...props}
        />
      )}
      {tab === 1 && <OrderItems resource={props.resource} data={data} />}
    </div>
  );
};
