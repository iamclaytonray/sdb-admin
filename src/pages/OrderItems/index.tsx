import Axios from 'axios';
import * as React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Error } from 'components/Error';
import { Loading } from 'components/Loading';

import { API_URL } from '../../constants';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 25,
  margin: `0 0 ${grid}px 0`,
  color: 'white',
  fontWeight: '700',
  letterSpacing: 1.2,

  background: isDragging ? 'darkgreen' : 'rgba(0,0,0,.7',

  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',

  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  padding: grid,
  width: '100%',
});

export class OrderItems extends React.Component<any, any> {
  public state = {
    items: [] as any,
    loading: true,
    error: null,
  };

  public componentDidMount() {
    this.fetch();
  }

  public async componentDidUpdate(prevProps: any) {
    if (prevProps.resource !== this.props.resource) {
      this.fetch();
    }
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/${this.props.resource}/unfiltered?page=1&size=200`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      this.setState({
        loading: false,
        items: res.data.data,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.response.data.message,
      });
    }
  }

  public onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items,
    });
  }

  public handleSave = async () => {
    this.state.items.map(async (item, i) => {
      try {
        const res = await Axios.put(
          `${API_URL}/${this.props.resource}/${item.slug}`,
          {
            order: i + 1,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            } as any,
          },
        );
        console.log('RES: ', res);
      } catch (error) {
        console.log('ERR: ', error);
        return;
      }
    });
    console.log('this.state.items: ', this.state.items);
  }

  public render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={index} draggableId={index} index={index}>
                    {/* tslint:disable-next-line */}
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        {this.props.resource === 'tabs'
                          ? item.label
                          : this.props.resource === 'products'
                          ? item.name
                          : item.title}
                        {item.category ? <span>{item.category}</span> : null}
                        {item.page ? <span>{item.page}</span> : null}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </React.Fragment>
    );
  }
}
