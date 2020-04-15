import { Button, Typography } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// import { ToastContext } from '../../context/ToastContext';
import { resourceCategories, sermonCategories } from '../../utils/categories';

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
  // letterSpacing: 1.2,

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
  // const toast = React.useContext(ToastContext);
  const [items, setItems] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState(null);

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

  const handleChangeCategory = (value: string) => {
    setActiveCategory(activeCategory === value ? '' : value);
  };

  // const handleSave = async () => {
  //   console.log('woo');
  //   try {
  //     toast.handleOpen('Success');
  //   } catch (error) {
  //     const errorMessage = error?.response?.data?.message;
  //     toast.handleOpen(JSON.stringify(errorMessage) as string);
  //     // setState({ ...state, error: errorMessage });
  //   }
  // };

  let filters: any[] = [];
  if (location.pathname.includes('sermons')) {
    filters = sermonCategories;
  }
  if (location.pathname.includes('resources')) {
    filters = resourceCategories;
  }

  const filteredData = activeCategory
    ? items
        .filter((node: any) => node.category === activeCategory)
        .sort((a: any, b: any) => a.order - b.order)
    : items.sort((a: any, b: any) => a.order - b.order);

  return (
    <div style={{ width: '100%' }}>
      {filters.map((filter: any) => (
        <Button
          key={filter.value}
          color="primary"
          variant={activeCategory === filter.value ? 'contained' : 'outlined'}
          style={{ margin: 8 }}
          onClick={() => handleChangeCategory(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
      {/* <div
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
      </div> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: any, snapshot: any) => (
            <div ref={provided.innerRef} style={getListStyle()}>
              {filteredData.map((item: any, index: number) => (
                <Draggable
                  // key={index}
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
                      {/* {item.page ? <span>{item.page}</span> : null} */}
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
