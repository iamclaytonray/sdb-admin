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
import { useHistory } from 'react-router-dom';

import { ColorSwatch } from '../../components/ColorSwatch';
import { MarkdownTextField } from '../../components/MarkdownTextField';
import { PartsForm } from '../../components/PartsForm';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';
import { resourceCategories } from '../../utils/categories';

export const CreateResourcePage = () => {
  const history = useHistory();
  const reduxForm = useSelector(
    (s: any) => s?.form?.partsForm?.values?.parts || [],
  );
  const resourcesLength = useSelector(
    (s: any) => Object.values(s.resources.allResources || {}).length,
  );
  const [state, setState] = React.useState({
    title: '',
    featuredImage: '',
    link: '',
    color: '#B56FEA',
    content: '',
    category: '',
    video: '',
    parts: [],

    error: null,
  });

  const handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      title,
      featuredImage,
      link,
      color,
      content,
      video,
      category,
    } = state;

    try {
      await Axios.post(
        `${API_URL}/jewish`,
        {
          title,
          featuredImage,
          link,
          content,
          color,
          video,
          category,
          parts: reduxForm,
          order: resourcesLength + 1,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );

      history.push(`/dashboard/jewish`);
    } catch (error) {
      setState({ ...state, error: error.response.data.message });
      window.scroll(0, 0);
    }
  };

  return (
    <Container fluid>
      <Row align="start" justify="start">
        <Col xs={12} sm={12} md={8} lg={6}>
          <form
            style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
            onSubmit={handleSubmit}
          >
            <SharedInput
              type="text"
              name="title"
              label="Title"
              value={state.title}
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
              name="video"
              label="Video"
              value={state.video}
              onChange={handleInputChange}
            />
            <SharedInput
              type="text"
              name="link"
              label="External Link"
              value={state.link}
              onChange={handleInputChange}
            />

            <FormControl variant="outlined" margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
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

            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <FormControl
                variant="outlined"
                margin="normal"
                fullWidth={false}
                style={{ width: '80%' }}
              >
                <InputLabel>Color</InputLabel>
                <Select
                  name="color"
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
            </div>

            <ColorSwatch color={state.color} />

            <MarkdownTextField
              value={state.content}
              onChange={(content: string) => setState({ ...state, content })}
            />
            <Button color="primary" variant="contained" type="submit">
              Create
            </Button>
          </form>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} style={{ marginTop: 16 }}>
          <PartsForm />
        </Col>
      </Row>
    </Container>
  );
};
