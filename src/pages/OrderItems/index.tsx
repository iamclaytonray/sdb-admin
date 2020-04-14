import { Button } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';

import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import { API_URL } from '../../constants';

export const OrderItems = (props: any) => {
  const [state, setState] = React.useState({
    items: [] as any,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    fetch();
  },              []);

  React.useEffect(() => {
    fetch();
  },              [props.resource]);

  // target id will only be set if dragging from one dropzone to another.
  const onChange = (
    _sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    _targetId: string,
  ) => {
    const nextState = swap(state.items, sourceIndex, targetIndex);
    // TODO:
    // get current index for each item and update each items `order` property

    setState({ ...state, items: nextState });
  };

  const fetch = async () => {
    try {
      const res = await Axios.get(`${API_URL}/${props.resource}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setState({
        ...state,
        loading: false,
        items: res.data.data,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const handleSave = async () => {
    console.log('woo');
  };

  if (state.loading) {
    return <Loading />;
  }

  if (state.error) {
    return <Error error={state.error} />;
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 16,
        }}
      >
        <Button color="primary" variant="contained" onClick={handleSave}>
          Save
        </Button>
      </div>
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={4}
          rowHeight={100}
          style={{ height: '400px' }}
        >
          {state.items.map((item: any) => (
            <GridItem
              key={item.id}
              style={{
                padding: 8,
                boxShadow: '0 0 2px #eee',
                backgroundColor: '#fff',
                width: 220,
                marginBottom: 24,
                paddingBottom: 24,
              }}
            >
              <div>{item.title}</div>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
};
