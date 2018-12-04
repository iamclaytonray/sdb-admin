import Axios from 'axios';
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
import { handleDelete } from '../../utils/methods';

export class SingleJewishPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    link: '',

    error: null,
    loading: true,
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/jewish/${this.props.match.params.slug}`,
      );
      this.setState({
        loading: false,
        title: res.data.data.title,
        slug: res.data.data.slug,
        featuredImage: res.data.data.featuredImage,
        link: res.data.data.link,
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

  public handleUpdate = (e: any) => {
    e.preventDefault();
    const { title, slug, featuredImage, link } = this.state;
    Axios.put(
      `${API_URL}/jewish/${this.props.match.params.slug}`,
      {
        title,
        slug,
        featuredImage,
        link,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
      .then(() => this.props.history.push('/dashboard/jewish'))
      .catch(error => this.setState({ error: error.response.data.message }));
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
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="form-control"
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
                value={this.state.featuredImage}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Link</Label>
              <Input
                name="link"
                type="text"
                value={this.state.link}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <Button
              color="danger"
              onClick={() =>
                handleDelete(
                  'jewish',
                  this.props.match.params.slug,
                  this.props.history,
                )
              }
            >
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
