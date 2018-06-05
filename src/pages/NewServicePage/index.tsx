import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Card, CardBody, CardTitle } from 'reactstrap';

const mutation = gql`
  mutation createService(
    $title: String!
    $slug: String!
    $category: String!
    $content: String!
    $videoUri: String!
    $featuredImage: String!
    $published: Boolean!
  ) {
    createService(
      data: {
        title: $title
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

export class NewServicePage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    videoUri: '',
    category: '',
    content: '',
    featuredImage: '',
    published: false,
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
      content,
      videoUri,
      featuredImage,
      published,
    } = this.state;
    createService({
      variables: {
        title,
        slug,
        category,
        content,
        videoUri,
        featuredImage,
        published,
      },
    }).then(data => {
      console.log(data);
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
                <form onSubmit={e => this.handleSubmit(e, createService)}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={this.state.title}
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
                    <label>Video URI</label>
                    <input
                      type="text"
                      name="videoUri"
                      placeholder="Video URI"
                      value={this.state.videoUri}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      value={this.state.category}
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

                  <div className="form-group">
                    <label>Content</label>
                    <textarea
                      name="content"
                      value={this.state.content}
                      placeholder="Content"
                      className="form-control"
                      rows={10}
                      onChange={this.handleInputChange}
                    />
                  </div>

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
