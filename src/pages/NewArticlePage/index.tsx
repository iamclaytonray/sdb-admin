import { Button } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Error } from '../../components/Error';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';

export class NewArticle extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    content: '',
    link: '',
    featuredImage: '',
    color: '#00ADFF',

    categories: [],

    error: null,
    loading: true,
  };

  public modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  public formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    const res = await Axios.get(`${API_URL}/tabs/?pageType=Discoveries`);
    this.setState({ categories: res.data.data });
  }

  public handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleQuillChange = (value: string) => {
    this.setState({ content: value });
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
      <div className="card">
        <div className="card-body">
          {this.state.error && <Error error={this.state.error} />}
          <h5 className="card-title">New Discovery</h5>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <SharedInput
              type="text"
              name="title"
              label="Title"
              value={this.state.title}
              required
              onChange={this.handleInputChange}
            />
            <SharedInput
              type="text"
              name="slug"
              label="Slug"
              value={this.state.slug}
              required
              onChange={this.handleInputChange}
            />
            <SharedInput
              type="text"
              name="featuredImage"
              label="Featured Image (thumbnail)"
              value={this.state.featuredImage}
              required
              onChange={this.handleInputChange}
            />

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
              <ReactQuill
                modules={this.modules}
                formats={this.formats}
                value={this.state.content}
                onChange={this.handleQuillChange}
                style={{ height: 500, marginBottom: 100 }}
              />
            </div>

            <ColorSwatch color={this.state.color} />
            <div className="form-group">
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
            </div>

            <Button color="primary" variant="contained" type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const NewArticlePage = connect(mapStateToProps)(NewArticle);
