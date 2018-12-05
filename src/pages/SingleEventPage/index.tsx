import Axios from 'axios';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import * as React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { API_URL } from '../../constants';

export class SingleEventPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    content: '',

    loading: true,
    error: null,
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/events/${this.props.match.params.slug}`,
      );
      this.setState({
        loading: false,
        title: res.data.data.title,
        slug: res.data.data.slug,
        featuredImage: res.data.data.featuredImage,
        content: res.data.data.content,
      });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
  }

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = (e: any) => {
    e.preventDefault();
    const { title, slug, featuredImage, content } = this.state;
    try {
      Axios.put(
        `${API_URL}/events/${this.props.match.params.slug}`,
        {
          title,
          slug,
          featuredImage,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      this.props.history.push('/dashboard/events');
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scroll(0, 0);
    }
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(`${API_URL}/events/${this.props.match.params.slug}`);
        this.props.history.push(`/dashboard/events`);
      } catch (error) {
        this.setState({ error: error.response.data.message });
        window.scroll(0, 0);
      }
      return;
    }
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
          <CardTitle>Update Event</CardTitle>
          {this.state.error && (
            <Error error={JSON.stringify(this.state.error)} />
          )}
          <Form>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Slug</Label>
              <Input
                type="text"
                name="slug"
                placeholder="Slug"
                value={this.state.slug}
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Featured Image</Label>
              <br />
              <img
                src={this.state.featuredImage}
                style={{ height: 100, width: 'auto' }}
              />
              <p />
              <Input
                name="featuredImage"
                type="text"
                placeholder="Featured Image"
                value={this.state.featuredImage}
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Content</Label>
              <textarea
                name="content"
                placeholder="Content"
                value={this.state.content}
                onChange={this.handleInputChange}
                className="form-control"
                rows={10}
              />
            </FormGroup>

            <Button color="danger" onClick={this.handleDelete}>
              Delete
            </Button>

            <Button color="primary" onClick={this.handleUpdate}>
              Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
