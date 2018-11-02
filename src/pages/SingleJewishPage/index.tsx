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
import { handleDelete } from '../../utils/methods';

class SingleJewish extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: props.jewish.title,
      slug: props.jewish.slug,
      featuredImage: props.jewish.featuredImage,
      description: props.jewish.description,
      link: props.jewish.link,
      published: props.jewish.published,

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
    const {
      title,
      slug,
      featuredImage,
      content,
      published,
      startDate,
      endDate,
      startTime,
      endTime,
      address,
      host,
      phone,
      email,
    } = this.state;
    Axios.put(`${API_URL}/jewish/${this.props.match.params.slug}`, {
      title,
      slug,
      featuredImage,
      content,
      published,
      startDate,
      endDate,
      startTime,
      endTime,
      address,
      host,
      phone,
      email,
    })
      .then(() => this.props.history.push('/dashboard/jewish'))
      .catch(err => this.setState({ error: err }));
  }

  public render() {
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
              <Label>Description</Label>
              <Input
                name="description"
                type="text"
                value={this.state.description}
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

export class SingleJewishPage extends React.Component<any, any> {
  public state = {
    loading: true,
    error: null,
    jewish: {},
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/jewish/${this.props.match.params.slug}`)
      .then(res => {
        this.setState({
          loading: false,
          jewish: res.data.data,
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
    return <SingleJewish jewish={this.state.jewish} {...this.props} />;
  }
}
