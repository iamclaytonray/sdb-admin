import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
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

const mutation = gql`
  mutation createProduct(
    $name: String!
    $slug: String!
    $price: Float!
    $content: String
    $featuredImage: String!
    $published: Boolean!
    $description: String!
    $storeLink: String!
  ) {
    createProduct(
      data: {
        name: $name
        slug: $slug
        price: $price
        description: $description
        content: $content
        featuredImage: $featuredImage
        published: $published
        storeLink: $storeLink
      }
    ) {
      id
    }
  }
`;

export class NewProductPage extends React.Component<any, any> {
  public state = {
    name: '',
    slug: '',
    description: '',
    content: '',
    featuredImage: '',
    published: false,
    storeLink: '',
    price: 0.0,
  };

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = (e, createProduct): any => {
    e.preventDefault();
    const {
      name,
      slug,
      featuredImage,
      description,
      storeLink,
      price,
      published,
    } = this.state;
    createProduct({
      variables: {
        name,
        slug,
        featuredImage,
        description,
        storeLink,
        price,
        published,
      },
    }).then(data => {
      const product = data.data.createProduct;
      this.props.history.push(`/dashboard/products/${product.slug}`);
    });
  }
  public render() {
    return (
      <Mutation mutation={mutation}>
        {(createProduct, { loading, error }) => {
          return (
            <Card>
              <CardBody>
                <CardTitle>New Product</CardTitle>

                {loading && <Loading />}
                {/* Add a Snackbox here noticing the user that there was an error */}
                {error && <Error error={error} />}
                <Form onSubmit={e => this.handleSubmit(e, createProduct)}>
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

                  <FormGroup>
                    <Label>Status/Published</Label>
                    <Input
                      type="checkbox"
                      name="published"
                      checked={this.state.published}
                      className="form-check-input"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  {/* <FormGroup>
                  <Label>Content</Label>
                  <textarea
                    name="content"
                    value={this.state.content}
                    placeholder="Content"
                    className="form-control"
                    rows={10}
                    onChange={this.handleInputChange}
                  />
                </div> */}

                  <Button type="submit" color="primary">
                    Create
                  </Button>
                </Form>
              </CardBody>
            </Card>
          );
        }}
      </Mutation>
    );
  }
}
