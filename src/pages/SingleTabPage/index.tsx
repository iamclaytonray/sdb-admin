import Axios from 'axios';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import * as React from 'react';
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { API_URL } from '../../constants';

class SingleTab extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      label: props.tab.label,
      slug: props.tab.slug,
      page: props.tab.page,

      error: null,
    };
  }

  public handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = (e: any) => {
    e.preventDefault();
    const { label, slug, page } = this.state;
    Axios.put(
      `${API_URL}/tabs/${this.props.match.params.slug}`,
      {
        label,
        slug,
        page,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
      .then(() => this.props.history.push('/dashboard/tabs'))
      .catch(err => this.setState({ error: err }));
  }

  public handleDelete = () => {
    alert('Are you sure?');
    Axios.delete(`${API_URL}/tabs/${this.props.match.params.slug}`)
      .then(() => this.props.history.push('/dashboard/tabs'))
      .catch(err => console.log(err));
  }

  public render() {
    return (
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <Label>Label</Label>
              <Input
                type="text"
                name="label"
                value={this.state.label}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Slug</Label>
              <Input
                type="text"
                name="slug"
                value={this.state.slug}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Page</Label>
              <Input
                type="select"
                name="page"
                value={this.state.page}
                onChange={this.handleInputChange}
                className="form-control"
              >
                <option>Discoveries</option>
                <option>Teachings</option>
              </Input>
            </FormGroup>
          </Form>
          <Button color="danger" onClick={this.handleDelete}>
            Delete
          </Button>
          <Button color="primary" onClick={this.handleUpdate}>
            Update
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export class SingleTabPage extends React.Component<any, any> {
  public state = {
    loading: true,
    error: null,
    tab: {},
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/tabs/${this.props.match.params.slug}`)
      .then(res => {
        this.setState({
          loading: false,
          tab: res.data.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return <SingleTab tab={this.state.tab} {...this.props} />;
  }
}
