import Axios from 'axios';
// import { Error } from 'components/Error';
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

export class SingleTabPage extends React.Component<any, any> {
  public state = {
    label: '',
    slug: '',
    page: '',

    loading: true,
    error: null,
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/tabs/${this.props.match.params.slug}`,
      );
      this.setState({
        loading: false,
        label: res.data.data.label,
        slug: res.data.data.slug,
        page: res.data.data.page,
      });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
  }

  public handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = async (e: any) => {
    e.preventDefault();
    const { label, slug, page } = this.state;
    try {
      await Axios.put(
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
      );

      this.props.history.push('/dashboard/tabs');
    } catch (error) {
      this.setState({ error: error.response.data.message });
    }
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(`${API_URL}/tabs/${this.props.match.params.slug}`);
        this.props.history.push(`/dashboard/tabs`);
      } catch (error) {
        this.setState({ error: error.response.data.message });
      }
      return;
    }
    return alert('Item not deleted');
  }

  public render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return (
        <Card>
          <CardBody>{JSON.stringify(this.state.error)}</CardBody>
        </Card>
      );
    }
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
