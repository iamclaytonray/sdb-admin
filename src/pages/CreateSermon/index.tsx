import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Error } from '../../components/Error';
import { API_URL } from '../../constants';

const CreateSermon = () => {
  const history = useHistory();
  const [state, setState] = React.useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    featuredImage: '',
    content: '',
    color: '#B56FEA',

    categories: [],

    error: null,
  });

  React.useEffect(() => {
    fetch();
  },              []);

  const fetch = async () => {
    try {
      const res = await Axios.get(`${API_URL}/tabs/?pageType=Teachings`);
      setState({ ...state, categories: res.data.data });
    } catch (error) {
      setState({ ...state, error });
    }
  };

  const handleInputChange = (event: any) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      title,
      slug,
      category,
      description,
      featuredImage,
      color,
      content,
    } = state;

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

      history.push(`/dashboard/services`);
    } catch (error) {
      setState({ ...state, error: error.response.data.message });
      window.scroll(0, 0);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">New Teaching</h5>
        {state.error && <Error error={state.error} />}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={state.title}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              value={state.slug}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Featured Image</label>
            <input
              type="text"
              name="featuredImage"
              placeholder="Featured Image"
              value={state.featuredImage}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={state.description}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <label>Category</label>
          <select
            name="category"
            value={state.category}
            onChange={handleInputChange}
            className="form-control"
          >
            {state.categories.length > 0 ? (
              state.categories.map((category: any, i: number) => (
                <option key={i} value={category.slug}>
                  {category.label}
                </option>
              ))
            ) : (
              <React.Fragment>
                Something went wrong trying to fetch the categories. If you see
                this message, please refresh or try again later. Also, let
                Clayton know.
              </React.Fragment>
            )}
          </select>

          <ColorSwatch color={state.color} />

          <label>Color</label>
          <select
            name="color"
            value={state.color}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="#B56FEA">Light Purple</option>
            <option value="#5A17C7">Purple</option>
            <option value="#031AF7">Dark Blue</option>
            <option value="#08D316">Green</option>
            <option value="#00ADFF">Light Blue</option>
            <option value="#FF4600">Orange</option>
          </select>

          {/* <div className="form-group">
            <label>Content</label>
            <ReactQuill
              modules={modules}
              formats={formats}
              value={state.content}
              onChange={handleQuillChange}
              style={{ height: 500, marginBottom: 100 }}
            />
          </div> */}

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const CreateSermonPage = connect(mapStateToProps)(CreateSermon);
