import { Button } from '@material-ui/core';
import * as React from 'react';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';

export const OrderItems = (props: any) => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    setItems(props.data);
  },              [props.data]);

  // target id will only be set if dragging from one dropzone to another.
  const onChange = (
    _sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    _targetId: string,
  ) => {
    const nextState = swap(items, sourceIndex, targetIndex);
    // TODO:
    // get current index for each item and update each items `order` property

    setItems(nextState);
  };

  const handleSave = async () => {
    console.log('woo');
  };

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
          {items.map((item: any) => (
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
