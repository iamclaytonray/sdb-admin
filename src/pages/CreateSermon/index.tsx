import { Button } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Error } from '../../components/Error';
import { SharedInput } from '../../components/SharedInput';
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
    <div>
      {state.error && <Error error={state.error} />}

      <form onSubmit={handleSubmit}>
        <SharedInput
          type="text"
          name="title"
          label="Title"
          value={state.title}
          onChange={handleInputChange}
        />
        <SharedInput
          type="text"
          name="slug"
          label="Slug"
          value={state.slug}
          onChange={handleInputChange}
        />
        <SharedInput
          type="text"
          name="featuredImage"
          label="Featured Image (thumbnail)"
          value={state.featuredImage}
          onChange={handleInputChange}
        />
        <SharedInput
          type="text"
          name="description"
          label="Description"
          value={state.description}
          onChange={handleInputChange}
        />

        <label>Category</label>
        <select
          name="category"
          value={state.category}
          onChange={handleInputChange}
        >
          {state.categories.length > 0 ? (
            state.categories.map((category: any, i: number) => (
              <option key={i} value={category.slug}>
                {category.label}
              </option>
            ))
          ) : (
            <pre>
              Something went wrong trying to fetch the categories. If you see
              this message, please refresh or try again later.
            </pre>
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

        <Button color="primary" variant="contained" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const CreateSermonPage = connect(mapStateToProps)(CreateSermon);
