import Axios from 'axios';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { API_URL } from '../../constants';

import { ColorSwatch } from 'components/ColorSwatch';
import { Loading } from 'components/Loading';
import { PartsForm } from 'components/PartForm';

export class SingleService extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    description: '',
    category: 'rabbi-don',
    color: '#5A17C7',
    parts: [],
    content: '',

    categories: [],

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

  public handleQullChange = (value: string) => {
    this.setState({ content: value });
  }

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/services/${this.props.match.params.slug}`,
      );

      const categoryRes = await Axios.get(
        `${API_URL}/tabs/?pageType=Teachings`,
      );

      const {
        content,
        title,
        slug,
        featuredImage,
        category,
        parts,
        description,
        color,
      } = res.data.data;
      const setContent = (await content) ? content : '';

      this.setState({
        loading: false,

        title,
        slug,
        featuredImage,
        description,
        category,
        color,
        parts,
        content: setContent,

        categories: categoryRes.data.data,
      });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
  }

  public handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = async (e: any) => {
    e.preventDefault();

    const {
      title,
      featuredImage,
      description,
      slug,
      category,
      color,
      content,
    } = this.state;
    try {
      await Axios.put(
        `${API_URL}/services/${this.props.match.params.slug}`,
        {
          title,
          featuredImage,
          description,
          slug,
          category,
          color,
          content,
          parts: this.props.formState.partsForm.values.parts,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      this.props.history.push('/dashboard/services');
    } catch (error) {
      this.setState({ error: error.response.data.message });
    }
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(
          `${API_URL}/services/${this.props.match.params.slug}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        );
        this.props.history.push(`/dashboard/services`);
      } catch (error) {
        this.setState({ error: error.response.data.message });
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
                className="form-control"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                value={this.state.slug}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <input
                type="text"
                name="featuredImage"
                value={this.state.featuredImage}
                onChange={this.handleInputChange}
                className="form-control"
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
                <div>
                  Something went wrong trying to fetch the categories. If you
                  see this message, please refresh or try again later. Also, let
                  Clayton know.
                </div>
              )}
            </select>

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
            {/*  */}
            <div className="form-group">
              <label>Content</label>
              <ReactQuill
                modules={this.modules}
                formats={this.formats}
                value={this.state.content}
                onChange={this.handleQullChange}
                style={{ height: 500, marginBottom: 100 }}
              />
            </div>
          </form>

          {/*  */}
          <PartsForm parts={this.state.parts} />
          {/*  */}

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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const SingleServicePage = connect(mapStateToProps)(SingleService);
