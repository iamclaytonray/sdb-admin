import Axios from 'axios';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { API_URL } from '../../constants';

export class SingleEventPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    content: '',

    loading: true,
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
      const res = await Axios.get(
        `${API_URL}/events/${this.props.match.params.slug}`,
      );
      this.setState({
        loading: false,
        title: res.data.data.title,
        slug: res.data.data.slug,
        featuredImage: res.data.data.featuredImage,
        content: res.data.data.content || '',
      });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
  }

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = (e: any) => {
    e.preventDefault();
    const { title, slug, featuredImage, content } = this.state;
    try {
      Axios.put(
        `${API_URL}/events/${this.props.match.params.slug}`,
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
      this.props.history.push('/dashboard/events');
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scroll(0, 0);
    }
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(
          `${API_URL}/events/${this.props.match.params.slug}`,
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
      return;
    }
  }

  public render() {
    if (this.state.loading) {
      return <Loading />;
    }

    if (this.state.error) {
      return (
        <div className="card">
          <div className="card-body">{JSON.stringify(this.state.error)}</div>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Update Event</h5>
          {this.state.error && (
            <Error error={JSON.stringify(this.state.error)} />
          )}
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="form-control"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                placeholder="Slug"
                className="form-control"
                value={this.state.slug}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <input
                name="featuredImage"
                type="text"
                placeholder="Featured Image"
                className="form-control"
                value={this.state.featuredImage}
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

            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button className="btn btn-primary" onClick={this.handleUpdate}>
                Update
              </button>
              <button className="btn btn-danger" onClick={this.handleDelete}>
                Delete All
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
