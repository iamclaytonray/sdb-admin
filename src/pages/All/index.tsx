import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Error } from '../../components/Error';
import { SharedTable } from '../../components/SharedTable';
import { API_URL } from '../../constants';
import { loadSermons } from '../../store/actions/sermons';
import { OrderItems } from '../OrderItems';

export const All = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [state, setState] = React.useState({
    view: 'table',

    loading: true,
    error: null,
    data: null as any,
  });
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    fetch();
  },              []);

  React.useEffect(() => {
    setState({ ...state, view: 'table', loading: true });
    fetch();

    return () =>
      setState({
        view: 'table',

        loading: true,
        error: null,
        data: null as any,
      });
  },              [location]);

  const fetch = async () => {
    try {
      const res = await Axios.get(`${API_URL}/${props.resource}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        } as any,
      });
      if (props.resource === 'services') {
        dispatch(loadSermons(res.data.data));
      }
      setState({ ...state, loading: false, data: res.data.data });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const toggle = () => {
    const newTab = tab === 0 ? 1 : 0;
    setTab(newTab);
  };

  if (state.error) {
    return <Error error={state.error} />;
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
          data={state.data || []}
          title={props.title}
          newLink={`${props.resource}/new`}
          otherLocation={props.resource}
          {...props}
        />
      )}
      {tab === 1 && <OrderItems resource={props.resource} />}
    </div>
  );
};
