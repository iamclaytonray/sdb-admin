import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { API_URL } from '../../constants';

import { ColorSwatch } from 'components/ColorSwatch';
import { Error } from 'components/Error';
import { PartsForm } from 'components/PartForm';

export class NewArticle extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    content: '',
    link: '',
    featuredImage: '',
    parts: [] as any,
    color: '#00ADFF',

    categories: [],

    error: null,
    loading: true,
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    const res = await Axios.get(`${API_URL}/tabs/?pageType=Discoveries`);
    this.setState({ categories: res.data.data });
  }

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = async (e: any): Promise<any> => {
    e.preventDefault();
    const {
      title,
      slug,
      featuredImage,
      category,
      link,
      content,
      color,
    } = this.state;
    // if (!title || !slug || !category) {
    //   this.setState({
    //     error: 'Please fill in the following fields: Title, Slug, and Category',
    //   });
    //   return;
    // }
    try {
      await Axios.post(
        `${API_URL}/articles`,
        {
          title,
          slug,
          featuredImage,
          category,
          link,
          content,
          color,
          parts: this.props.formState.partsForm.values.parts,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      this.props.history.push(`/dashboard/articles`);
    } catch (error) {
      this.setState({
        error: error.response.data.message,
      });
      window.scrollTo(0, 0);
    }
  }

  public render() {
    // if (this.state.error) {
    //   return (
    //     <Card>
    //       <CardBody>{this.state.error}</CardBody>
    //     </Card>
    //   );
    // }
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
                required
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
                required
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

            <label>Category</label>
            <select
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
              className="form-control"
            >
              {this.state.categories.length > 0 ? (
                this.state.categories.map((category: any, i: number) => (
                  <option key={i} value={category.slug}>
                    {category.label}
                  </option>
                ))
              ) : (
                <React.Fragment>
                  Something went wrong trying to fetch the categories. If you
                  see this message, please refresh or try again later. Also, let
                  Clayton know.
                </React.Fragment>
              )}
            </select>

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

            <ColorSwatch color={this.state.color} />
            <label>Color</label>
            <select
              name="color"
              value={this.state.color}
              onChange={this.handleInputChange}
              className="form-control"
              required
            >
              <option value="#B56FEA">Light Purple</option>
              <option value="#5A17C7">Purple</option>
              <option value="#031AF7">Dark Blue</option>
              <option value="#08D316">Green</option>
              <option value="#00ADFF">Light Blue</option>
              <option value="#FF4600">Orange</option>
            </select>

            <PartsForm />

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const NewArticlePage = connect(mapStateToProps)(NewArticle);
