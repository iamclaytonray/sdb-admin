import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ColorSwatch } from '../../components/ColorSwatch';
import { MarkdownTextField } from '../../components/MarkdownTextField';
import { PartsForm } from '../../components/PartsForm';
import { SharedInput } from '../../components/SharedInput';
import { ToastContext } from '../../context/ToastContext';
import { resourceCategories } from '../../utils/categories';
import { handleApiDelete } from '../../utils/handleApiDelete';
import { handleApiUpdate } from '../../utils/handleApiUpdate';
import { resourceTypes } from '../../utils/resourceTypes';

export const ResourceDetailsPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const toast = React.useContext(ToastContext);
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
    resourceType: '',
    categories: [],
    parts: [],
    video: '',

    error: null,
  });

  React.useEffect(() => {
    initData();
  },              [id]);

  const initData = () => {
    const {
      title,
      slug,
      featuredImage,
      category,
      externalLink,
      content,
      color,
      resourceType,
      parts,
      video,
    } = selectedResource;
    setState({
      ...state,
      title,
      slug,
      featuredImage,
      category,
      externalLink,
      content,
      color,
      resourceType,
      parts,
      video,
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
      parts,
      video,
    } = state;
    const data = {
      title,
      slug,
      featuredImage,
      category,
      externalLink,
      content,
      color,
      parts,
      video,
    };
    console.log(data);
    const { success, error } = await handleApiUpdate(`/resources/${id}`, data);

    if (success) {
      toast.handleOpen('Success');
    }

    if (error) {
      toast.handleOpen(JSON.stringify(error));
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm(
      'Are you sure? This action cannot be undone.',
    );
    if (confirm) {
      const { success, error } = await handleApiDelete(`/resources/${id}`);

      if (success) {
        toast.handleOpen('Success');
        history.push(`/dashboard/resources`);
      }

      if (error) {
        toast.handleOpen(JSON.stringify(error));
      }
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

  console.log(state);

  return (
    <Container fluid>
      <Row align="start" justify="start">
        <Col xs={12} sm={12} md={8} lg={6}>
          <form style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
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
              label="Video"
              name="video"
              value={state.video}
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
                Type
              </InputLabel>
              <Select
                labelId="resourceType-label"
                id="resourceType-input"
                label="Type"
                name="resourceType"
                value={state.resourceType}
                onChange={handleInputChange}
              >
                {resourceTypes.map((resourceType) => (
                  <MenuItem value={resourceType.value}>
                    {resourceType.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {state.resourceType === 'article' && (
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
            )}

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
            </div>

            <MarkdownTextField
              value={state.content}
              onChange={(value: string) =>
                setState({ ...state, content: value })
              }
            />

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
        <Col xs={12} sm={12} md={8} lg={6} style={{ marginTop: 16 }}>
          <PartsForm />
        </Col>
      </Row>
    </Container>
  );
};
