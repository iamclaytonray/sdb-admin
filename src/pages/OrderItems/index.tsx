import { Button, Typography } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { API_URL } from '../../constants';
import { ToastContext } from '../../context/ToastContext';
import { authHeader } from '../../utils/authHeader';

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  padding: 16,
  margin: `0 0 ${grid}px 0`,
  color: 'white',
  fontWeight: '700',
  background: isDragging ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.6)',
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  ...draggableStyle,
});

const getListStyle = () => ({
  padding: grid,
  width: '100%',
});

export const OrderItems = (props: any) => {
  const toast = React.useContext(ToastContext);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    setItems(props.data);
  },              [props.data]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems: any = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(newItems);
  };

  const handleSave = async () => {
    try {
      const itemsToSave: any[] = [];
      for (let index = 0; index < items.length; index++) {
        const node: any = items[index];
        itemsToSave.push({ id: node.id, order: index });
      }

      if (props.resource === 'events') {
        await Axios.put(
          `${API_URL}/events`,
          { events: itemsToSave },
          authHeader,
        );
      }

      if (props.resource === 'sermons') {
        await Axios.put(
          `${API_URL}/sermons`,
          { sermons: itemsToSave },
          authHeader,
        );
      }

      if (props.resource === 'resources') {
        await Axios.put(
          `${API_URL}/resources`,
          { resources: itemsToSave },
          authHeader,
        );
      }

      console.log(itemsToSave);
      toast.handleOpen('Success');
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.handleOpen(JSON.stringify(errorMessage) as string);
      // setState({ ...state, error: errorMessage });
    }
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: any) => (
            <div ref={provided.innerRef} style={getListStyle()}>
              {items.map((item: any, index: number) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {/* tslint:disable-next-line */}
                  {(provided: any, snapshot: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      <Typography variant="body1">{item.title}</Typography>
                      <Typography variant="body1">{index + 1}</Typography>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
