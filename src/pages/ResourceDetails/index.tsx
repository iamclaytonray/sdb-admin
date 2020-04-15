import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Error } from '../../components/Error';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';
import { resourceCategories } from '../../utils/categories';

export const ResourceDetailsPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const selectedResource = useSelector(
    (s: any) => s.resources.allResources[id as string],
  );

  const [state, setState] = React.useState({
    title: '',
    slug: '',
    featuredImage: '',
    category: '',
    externalLink: '',
    content: '',
    color: '#B56FEA',

    categories: [],

    loading: true,
    error: null,
  });

  React.useEffect(() => {
    initData();
  },              [id]);

  const initData = () => {
    setState({
      ...state,
      ...selectedResource,
    });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const {
      title,
      slug,
      featuredImage,
      category,
      externalLink,
      content,
      color,
    } = state;
    try {
      await Axios.put(
        `${API_URL}/articles/${id}`,
        {
          title,
          slug,
          featuredImage,
          category,
          externalLink,
          content,
          color,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      history.push('/dashboard/articles');
    } catch (error) {
      window.scroll(0, 0);
      setState({ ...state, error: error.response.data.message });
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(`${API_URL}/articles/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        history.push(`/dashboard/articles`);
      } catch (error) {
        // console.log(error);
        setState({ ...state, error: error.response.data.message });
      }
      return;
    }
    return alert('Item not deleted');
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

  if (state.error) {
    return (
      <div className="card">
        <div className="card-body">{JSON.stringify(state.error)}</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        {state.error && <Error error={state.error} />}
        <form>
          <SharedInput
            type="text"
            label="Title"
            name="title"
            value={state.title}
            onChange={handleInputChange}
          />
          <SharedInput
            type="text"
            label="Slug"
            name="slug"
            value={state.slug}
            onChange={handleInputChange}
          />
          <SharedInput
            type="text"
            label="Featured Image (thumbnail)"
            name="featuredImage"
            value={state.featuredImage}
            onChange={handleInputChange}
          />
          <SharedInput
            type="text"
            label="External Link"
            name="exteralLink"
            value={state.externalLink}
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
              name="category"
              value={state.category}
              onChange={handleInputChange}
            >
              {resourceCategories.map((category) => (
                <MenuItem value={category.value}>{category.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" margin="normal">
            <InputLabel id="demo-simple-select-outlined-label">
              Color
            </InputLabel>
            <Select
              labelId="color-label"
              id="color-input"
              label="Color"
              value={state.color}
              name="color"
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

          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button color="primary" variant="contained" onClick={handleUpdate}>
              Update
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleDelete}
            >
              Delete All
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
