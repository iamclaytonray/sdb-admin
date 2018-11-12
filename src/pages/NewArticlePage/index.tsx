import Axios from 'axios';
import { Error } from 'components/Error';
import * as React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { API_URL } from '../../constants';

export class NewArticlePage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    content: '',
    link: '',
    featuredImage: '',
    parts: [] as any,

    error: null,
    loading: true,
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
      title,
      slug,
      featuredImage,
      category,
      link,
      content,
      // parts,
    } = this.state;
    Axios.post(
      `${API_URL}/articles`,
      {
        title,
        slug,
        featuredImage,
        category,
        link,
        content,
        parts: [],
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
      .then(res => {
        this.props.history.push(`/dashboard/articles`);
      })
      .catch(err => {
        this.setState({
          error: err.response.data.error,
        });
      });
  }

  public render() {
    return (
      <Card>
        <CardBody>
          {this.state.error && <Error error={this.state.error} />}
          <CardTitle>New Discovery</CardTitle>
          <form onSubmit={e => this.handleSubmit(e)}>
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
  }
}
