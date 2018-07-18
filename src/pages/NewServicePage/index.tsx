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
  mutation createService(
    $title: String!
    $slug: String!
    $category: String!
    $description: String!
    $featuredImage: String!
    $published: Boolean!
    $mediumLink: String!
  ) {
    createService(
      data: {
        title: $title
        slug: $slug
        category: $category
        description: $description
        featuredImage: $featuredImage
        published: $published
        anchorLink: $anchorLink
        mediumLink: $mediumLink
        youtubeLink: $youtubeLink
      }
    ) {
      id
    }
  }
`;

export class NewServicePage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    description: '',
    featuredImage: '',
    published: false,
    anchorLink: '',
    mediumLink: '',
    youtubeLink: '',
  };

  public handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = (e, createService): any => {
    e.preventDefault();
    const {
      title,
      slug,
      category,
      description,
      featuredImage,
      published,
      anchorLink,
      mediumLink,
      youtubeLink,
    } = this.state;
    createService({
      variables: {
        title,
        slug,
        category,
        description,
        featuredImage,
        published,
        anchorLink,
        mediumLink,
        youtubeLink,
      },
    }).then(data => {
      const service = data.data.createService;
      this.props.history.push(`/dashboard/services/${service.slug}`);
    });
  }
  public render() {
    return (
      <Mutation mutation={mutation}>
        {(createService, { loading, error }) => {
          return (
            <Card>
              <CardBody>
                <CardTitle>New Service</CardTitle>

                {loading && <Loading />}
                {/* Add a Snackbox here noticing the user that there was an error */}
                {error && <Error error={error} />}
                <Form onSubmit={e => this.handleSubmit(e, createService)}>
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={this.state.title}
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
                    <Label>Medium Link</Label>
                    <Input
                      type="text"
                      name="mediumLink"
                      placeholder="Medium Link"
                      value={this.state.mediumLink}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Anchor Link</Label>
                    <Input
                      type="text"
                      name="anchorLink"
                      placeholder="Anchor Link"
                      value={this.state.anchorLink}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>YouTube Link</Label>
                    <Input
                      type="text"
                      name="youtubeLink"
                      placeholder="YouTube Link"
                      value={this.state.youtubeLink}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Category</Label>
                    <Input
                      type="text"
                      name="category"
                      placeholder="Category"
                      value={this.state.category}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Published?</Label>
                    <Input
                      type="checkbox"
                      name="published"
                      checked={this.state.published}
                      className="form-check-input"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <Button type="submit" className="btn btn-primary">
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
