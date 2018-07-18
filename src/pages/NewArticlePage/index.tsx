import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Card, CardBody, CardTitle } from 'reactstrap';

const mutation = gql`
  mutation createArticle(
    $title: String!
    $slug: String!
    $category: String!
    $content: String!
    $link: String!
    $featuredImage: String!
    $published: Boolean!
  ) {
    createArticle(
      data: {
        title: $title
        slug: $slug
        category: $category
        content: $content
        link: $link
        featuredImage: $featuredImage
        published: $published
      }
    ) {
      id
      slug
    }
  }
`;

export class NewArticlePage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    content: '',
    link: '',
    featuredImage: '',
    published: false,
  };

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = (e, createArticle): any => {
    e.preventDefault();
    const {
      title,
      slug,
      featuredImage,
      published,
      category,
      content,
      link,
    } = this.state;
    createArticle({
      variables: {
        title,
        slug,
        featuredImage,
        published,
        category,
        content,
        link,
      },
    }).then(data => {
      const article = data.data.createArticle;
      this.props.history.push(`/dashboard/articles/${article.slug}`);
    });
  }

  public render() {
    return (
      <Mutation mutation={mutation}>
        {(createArticle, { loading, error }) => {
          return (
            <Card>
              <CardBody>
                <CardTitle>New Article</CardTitle>

                {loading && <Loading />}
                {/* Add a Snackbox here noticing the user that there was an error */}
                {error && <Error error={error} />}
                <form onSubmit={e => this.handleSubmit(e, createArticle)}>
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
                    <label>Link</label>
                    <input
                      type="text"
                      name="link"
                      placeholder="Link"
                      value={this.state.link}
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
