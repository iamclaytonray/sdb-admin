import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Loading } from '../../components/Loading';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';

export const SermonDetailsPage = () => {
  const history = useHistory();
  const { slug } = useParams();
  const { selectedSermonId } = useSelector((s: any) => s.sermons);
  const selectedSermon = useSelector(
    (s: any) => s.sermons.allSermons[selectedSermonId],
  );
  const [state, setState] = React.useState({
    title: '',
    slug: '',
    featuredImage: '',
    description: '',
    category: 'rabbi-don',
    color: '#5A17C7',
    content: '',

    categories: [],

    loading: false,
    error: null,
  });

  React.useEffect(() => {
    initData();
  },              [selectedSermonId]);

  const initData = () => {
    setState({
      ...state,
      ...selectedSermon,
    });
  };

  const handleInputChange = (event) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const {
      title,
      featuredImage,
      description,
      // slug,
      category,
      color,
      content,
    } = state;
    try {
      await Axios.put(
        `${API_URL}/services/${slug}`,
        {
          title,
          featuredImage,
          description,
          slug,
          category,
          color,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      history.push('/dashboard/services');
    } catch (error) {
      setState({ ...state, error: error.response.data.message });
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(`${API_URL}/services/${slug}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        history.push(`/dashboard/services`);
      } catch (error) {
        setState({ ...state, error: error.response.data.message });
      }
      return;
    }
    return alert('Item not deleted');
  };

  if (state.loading) {
    return <Loading />;
  }

  if (state.error) {
    return (
      <div className="card">
        <div className="card-body">{JSON.stringify(state.error)}</div>
      </div>
    );
  }

  return (
    <Container fluid>
      <Row align="center" justify="center">
        <Col xs={12} sm={12} md={8} lg={8}>
          <form style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
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
              name="description"
              label="Description"
              value={state.description}
              onChange={handleInputChange}
            />

            <SharedInput
              type="text"
              name="featuredImage"
              label="Featured Image (thumbnail)"
              value={state.featuredImage}
              onChange={handleInputChange}
            />

            {/* <FormControl variant="outlined" margin="normal">
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
                {state.categories.map((category: any) => (
                  <MenuItem value={category._id}>{category.label}</MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <ColorSwatch color={state.color} />

            <FormControl variant="outlined" margin="normal">
              <InputLabel id="demo-simple-select-outlined-label">
                Color
              </InputLabel>
              <Select
                labelId="color-label"
                id="color-input"
                label="Color"
                value={state.color}
                // onChange={handleChange}
              >
                <MenuItem value="#B56FEA">Light Purple</MenuItem>
                <MenuItem value="#5A17C7">Purple</MenuItem>
                <MenuItem value="#031AF7">Dark Blue</MenuItem>
                <MenuItem value="#08D316">Green</MenuItem>
                <MenuItem value="#00ADFF">Light Blue</MenuItem>
                <MenuItem value="#FF4600">Orange</MenuItem>
              </Select>
            </FormControl>

            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleUpdate}
              >
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
        </Col>
      </Row>
    </Container>
  );
};
