import Axios from 'axios';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';

import { ColorSwatch } from 'components/ColorSwatch';
import { Error } from 'components/Error';

import { API_URL } from '../../constants';

export class NewService extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    description: '',
    featuredImage: '',
    content: '',
    color: '#B56FEA',

    categories: [],

    error: null,
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

  public handleQuillChange = (value: string) => {
    this.setState({ content: value });
  }

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(`${API_URL}/tabs/?pageType=Teachings`);
      this.setState({ categories: res.data.data });
    } catch (error) {
      this.setState({ error });
    }
  }

  public handleInputChange = (event: any) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      title,
      slug,
      category,
      description,
      featuredImage,
      color,
      content,
    } = this.state;

    try {
      await Axios.post(
        `${API_URL}/services`,
        {
          title,
          slug,
          category,
          description,
          featuredImage,
          color,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );

      this.props.history.push(`/dashboard/services`);
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scroll(0, 0);
    }
  }

  public render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">New Teaching</h5>
          {this.state.error && <Error error={this.state.error} />}

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

            <ColorSwatch color={this.state.color} />

            <label>Color</label>
            <select
              name="color"
              value={this.state.color}
              onChange={this.handleInputChange}
              className="form-control"
            >
              <option value="#B56FEA">Light Purple</option>
              <option value="#5A17C7">Purple</option>
              <option value="#031AF7">Dark Blue</option>
              <option value="#08D316">Green</option>
              <option value="#00ADFF">Light Blue</option>
              <option value="#FF4600">Orange</option>
            </select>

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

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const NewServicePage = connect(mapStateToProps)(NewService);
