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
  const [items, setItems] = React.useState([1, 2, 3, 4]);
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
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  };

  const fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/${props.resource}/unfiltered?page=1&size=200`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
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
    state.items.map(async (item, i) => {
      try {
        await Axios.put(
          `${API_URL}/${props.resource}/${item.slug}`,
          {
            order: i + 1,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            } as any,
          },
        );
      } catch (error) {
        return;
      }
    });
  };

  if (state.loading) {
    return <Loading />;
  }

  if (state.error) {
    return <Error error={state.error} />;
  }

  return (
    <React.Fragment>
      <GridContextProvider onChange={onChange}>
        <GridDropZone id="items" boxesPerRow={4} rowHeight={60}>
          {items.map((item) => (
            <GridItem
              key={item._id}
              style={{
                margin: 8,
                padding: 8,
                boxShadow: '0 0 2px #eee',
                backgroundColor: '#fff',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                {item.title}
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
      <button onClick={handleSave} className="btn btn-primary">
        Save
      </button>
    </React.Fragment>
  );
};
