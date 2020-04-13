import Axios from 'axios';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Loading } from '../../components/Loading';
import { API_URL } from '../../constants';

export class SingleJewishPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    link: '',
    color: '#B56FEA',
    content: '',

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

  public handleQuillChange = (value: string) => {
    this.setState({ content: value });
  }

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/jewish/${this.props.match.params.slug}`,
      );
      this.setState({
        loading: false,
        title: res.data.data.title,
        slug: res.data.data.slug,
        featuredImage: res.data.data.featuredImage,
        link: res.data.data.link,
        color: res.data.data.color,
        content: res.data.data.content || '',
      });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
  }

  public handleinputChange = (event) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = async (e: any) => {
    e.preventDefault();
    const { title, slug, featuredImage, link, color, content } = this.state;
    try {
      await Axios.put(
        `${API_URL}/jewish/${this.props.match.params.slug}`,
        {
          title,
          slug,
          featuredImage,
          link,
          color,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );

      this.props.history.push('/dashboard/jewish');
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scrollTo(0, 0);
    }
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(
          `${API_URL}/jewish/${this.props.match.params.slug}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        );
        this.props.history.push(`/dashboard/jewish`);
      } catch (error) {
        this.setState({ error: error.response.data.message });
        window.scroll(0, 0);
      }
      return;
    }
    return alert('Item not deleted');
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
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleinputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                value={this.state.slug}
                onChange={this.handleinputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <input
                name="featuredImage"
                type="text"
                value={this.state.featuredImage}
                onChange={this.handleinputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Link</label>
              <input
                name="link"
                type="text"
                value={this.state.link}
                onChange={this.handleinputChange}
                className="form-control"
              />
            </div>

            <ColorSwatch color={this.state.color} />

            <label>Color</label>
            <select
              name="color"
              value={this.state.color}
              onChange={(e: any) => this.setState({ color: e.target.value })}
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
