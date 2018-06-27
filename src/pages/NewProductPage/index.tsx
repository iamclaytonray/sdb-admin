import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Card, CardBody, CardTitle } from 'reactstrap';

const mutation = gql`
  mutation createProduct(
    $name: String!
    $slug: String!
    $category: String!
    $content: String!
    $videoUri: String!
    $featuredImage: String!
    $published: Boolean!
  ) {
    createProduct(
      data: {
        name: $name
        slug: $slug
        category: $category
        content: $content
        videoUri: $videoUri
        featuredImage: $featuredImage
        published: $published
      }
    ) {
      id
      slug
    }
  }
`;

export class NewProductPage extends React.Component<any, any> {
  public state = {
    name: '',
    slug: '',
    description: '',
    // content: '',
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
      console.log(data);
      const product = data.data.createProduct;
      this.props.history.push(`/dashboard/products/${product.slug}`);
    });
  }
  public render() {
    console.log(this.state);
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
                <form onSubmit={e => this.handleSubmit(e, createProduct)}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Slug</label>
                    <input
                      type="text"
                      name="slug"
                      placeholder="Slug"
                      value={this.state.slug}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Featured Image</label>
                    <input
                      type="text"
                      name="featuredImage"
                      placeholder="Featured Image"
                      value={this.state.featuredImage}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={this.state.description}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Status/Published</label>
                    <input
                      type="checkbox"
                      name="published"
                      checked={this.state.published}
                      // className="form-check-input"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  {/* <div className="form-group">
                  <label>Content</label>
                  <textarea
                    name="content"
                    value={this.state.content}
                    placeholder="Content"
                    className="form-control"
                    rows={10}
                    onChange={this.handleInputChange}
                  />
                </div> */}

                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </form>
              </CardBody>
            </Card>
          );
        }}
      </Mutation>
    );
  }
}
