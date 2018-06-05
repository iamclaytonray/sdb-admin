import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { TextEditor } from 'components/TextEditor';
// import { Editor, EditorState } from 'draft-js';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Card, CardBody, CardTitle } from 'reactstrap';

const mutation = gql`
  mutation createAnnouncement(
    $title: String!
    $slug: String!
    $content: String!
    $featuredImage: String!
    $published: Boolean!
  ) {
    createAnnouncement(
      data: {
        title: $title
        slug: $slug
        content: $content
        featuredImage: $featuredImage
        published: $published
      }
    ) {
      id
      slug
    }
  }
`;

export class NewAnnouncementPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    content: '',
    published: false,
  };

  public onEditorChange = editor => this.setState({ editor });

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = (e, createAnnouncement): any => {
    e.preventDefault();
    const { title, slug, featuredImage, content, published } = this.state;
    createAnnouncement({
      variables: {
        title,
        slug,
        featuredImage,
        content,
        published,
      },
    }).then(data => {
      console.log(data);
      const announcement = data.data.createAnnouncement;
      this.props.history.push(`/dashboard/announcements/${announcement.slug}`);
    });
  }

  public render() {
    console.log(this.state);
    return (
      <Mutation mutation={mutation}>
        {(createAnnouncement, { loading, error }) => {
          return (
            <Card>
              <CardBody>
                <CardTitle>New Announcement</CardTitle>

                {loading && <Loading />}
                {/* Add a Snackbox here noticing the user that there was an error */}
                {error && <Error error={error} />}
                <form onSubmit={e => this.handleSubmit(e, createAnnouncement)}>
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
                    <TextEditor />
                    {/* <textarea
                    name="content"
                    value={this.state.content}
                    placeholder="Content"
                    className="form-control"
                    rows={10}
                    onChange={this.handleInputChange}
                  /> */}
                    {/* <Editor
                      name="content"
                      placeholder="Content"
                      editorState={this.state.editor}
                      onChange={this.onEditorChange}
                    /> */}
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
