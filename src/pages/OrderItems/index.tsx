import Axios from 'axios';
import { Loading } from 'components/Loading';
import * as React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';
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
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: 'white',
  fontWeight: '700',
  letterSpacing: 1.2,

  background: isDragging ? 'lightgreen' : 'grey',

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
    categories: [] as any,
    category: '',
  };

  public componentDidMount() {
    if (
      this.props.resource === 'articles' ||
      this.props.resource === 'services'
    ) {
      this.fetchTabs();
    }
    this.fetch();
  }

  public async componentDidUpdate(prevProps: any) {
    if (prevProps.resource !== this.props.resource) {
      if (
        this.props.resource === 'articles' ||
        this.props.resource === 'services'
      ) {
        this.fetchTabs();
      }

      this.setState({ categories: [] });
      this.fetch();
    }
  }

  public fetchTabs = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/tabs/${
          this.props.resource === 'articles'
            ? 'discoveries'
            : this.props.resource === 'services'
            ? 'services'
            : null
        }`,
      );
      this.setState({
        loading: false,
        categories: res.data.data,
        category: res.data.data[0].slug,
      });
      this.fetch();
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.error });
    }
  }

  public fetch = async () => {
    const { category } = this.state;

    try {
      const res = await Axios.get(
        `${API_URL}/${
          this.props.resource
        }?category=${category}&page=1&size=100`,
      );
      this.setState({
        loading: false,
        items: res.data.data,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.response.data.error,
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
      // console.log({
      //   item: item,
      //   category: this.state.category + (i + 1)
      // });
      try {
        const res = await Axios.put(
          `${API_URL}/${this.props.resource}/${item.slug}`,
          {
            order: this.state.category + (i + 1),
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
      }
    });
    console.log('this.state.items: ', this.state.items);
  }

  public toggle = async category => {
    await this.setState({
      category,
    });
    try {
      const res = await Axios.get(
        `${API_URL}/${
          this.props.resource
        }?category=${category}&page=1&size=100`,
      );
      this.setState({
        items: res.data.data,
      });
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scrollTo(0, 0);
    }
  }

  public render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        {/*  */}
        <Nav tabs className="nav-pills-primary nav-pills">
          {this.state.categories &&
            this.state.categories.map((category: any, i: number) => (
              <NavItem key={i}>
                <NavLink
                  onClick={() => {
                    this.toggle(category.slug);
                  }}
                  className={
                    this.state.category === category.slug ? 'active' : ''
                  }
                  style={{ border: 'none' }}
                >
                  {category.label}
                </NavLink>
              </NavItem>
            ))}
        </Nav>
        {/*  */}
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
                        <br />
                        <p>{item.order}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button onClick={this.handleSave} color="primary">
          Save
        </Button>
      </React.Fragment>
    );
  }
}
