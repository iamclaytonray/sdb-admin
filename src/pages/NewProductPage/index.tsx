import Axios from 'axios';
import { Error } from 'components/Error';
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

export class NewProductPage extends React.Component<any, any> {
  public state = {
    name: '',
    slug: '',
    description: '',
    content: '',
    featuredImage: '',
    storeLink: '',
    price: 0.0,

    error: null,
  };

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = (e): any => {
    e.preventDefault();
    const {
      name,
      slug,
      featuredImage,
      description,
      storeLink,
      price,
    } = this.state;
    Axios.post(
      `${API_URL}/products`,
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
      .then(() => {
        this.props.history.push(`/dashboard/products`);
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        window.scroll(0, 0);
      });
  }

  public render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>New Product</CardTitle>
          {this.state.error && (
            <Error error={JSON.stringify(this.state.error)} />
          )}
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                className="form-control"
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
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Featured Image</Label>
              <Input
                type="text"
                name="featuredImage"
                placeholder="Featured Image"
                value={this.state.featuredImage}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Description"
                value={this.state.description}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Store Link</Label>
              <Input
                type="text"
                name="storeLink"
                placeholder="Store Link"
                value={this.state.storeLink}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={this.state.price}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <Button type="submit" color="primary">
              Create
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
