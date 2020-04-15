import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Error } from '../../components/Error';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';
import { sermonCategories } from '../../utils/categories';

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
        `${API_URL}/sermons`,
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

      history.push(`/dashboard/sermons`);
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

        <FormControl variant="outlined" margin="normal">
          <InputLabel id="demo-simple-select-outlined-label">
            Category
          </InputLabel>
          <Select
            labelId="category-label"
            id="category-input"
            label="Category"
            value={state.category}
            // onChange={handleChange}
          >
            {sermonCategories.map((category) => (
              <MenuItem value={category.value}>{category.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" margin="normal">
          <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
          <Select
            labelId="color-label"
            id="color-input"
            label="Color"
            value={state.color}
            onChange={handleInputChange}
          >
            <MenuItem value="#B56FEA">Light Purple</MenuItem>
            <MenuItem value="#5A17C7">Purple</MenuItem>
            <MenuItem value="#031AF7">Dark Blue</MenuItem>
            <MenuItem value="#08D316">Green</MenuItem>
            <MenuItem value="#00ADFF">Light Blue</MenuItem>
            <MenuItem value="#FF4600">Orange</MenuItem>
          </Select>
        </FormControl>
        <ColorSwatch color={state.color} />

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
