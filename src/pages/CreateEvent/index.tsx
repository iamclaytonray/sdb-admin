import Axios from 'axios';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Error } from '../../components/Error';
import { API_URL } from '../../constants';

export class CreateEventPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    content: '',

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

  public handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = async (e: any) => {
    e.preventDefault();
    const { title, slug, featuredImage, content } = this.state;

    try {
      await Axios.post(
        `${API_URL}/events`,
        {
          title,
          slug,
          featuredImage,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );

      this.props.history.push(`/dashboard/events`);
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scroll(0, 0);
    }
  }

  public render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5>New Event</h5>
          {this.state.error && (
            <Error error={JSON.stringify(this.state.error)} />
          )}
          <form onSubmit={(e) => this.handleSubmit(e)}>
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
              <label>Content</label>
              <ReactQuill
                modules={this.modules}
                formats={this.formats}
                value={this.state.content}
                onChange={this.handleQuillChange}
                style={{ height: 500, marginBottom: 100 }}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}
