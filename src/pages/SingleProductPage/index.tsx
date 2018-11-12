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

class SingleProduct extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: props.product.name,
      slug: props.product.slug,
      featuredImage: props.product.featuredImage,
      description: props.product.description,
      storeLink: props.product.storeLink,
      price: props.product.price,

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
      name,
      slug,
      featuredImage,
      description,
      storeLink,
      price,
    } = this.state;
    Axios.put(
      `${API_URL}/products/${this.props.match.params.slug}`,
      {
        name,
        slug,
        featuredImage,
        description,
        storeLink,
        price,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
      .then(() => this.props.history.push('/dashboard/products'))
      .catch(err => this.setState({ error: err }));
  }

  public render() {
    return (
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={this.state.name}
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
              <Label>Store Link</Label>
              <Input
                name="storeLink"
                type="text"
                value={this.state.storeLink}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Price</Label>
              <Input
                name="price"
                type="text"
                value={this.state.price}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <Button
              color="danger"
              onClick={() =>
                handleDelete(
                  'products',
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

export class SingleProductPage extends React.Component<any, any> {
  public state = {
    loading: true,
    error: null,
    product: {},
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/products/${this.props.match.params.slug}`)
      .then(res => {
        this.setState({
          loading: false,
          product: res.data.data,
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
    return <SingleProduct product={this.state.product} {...this.props} />;
  }
}
