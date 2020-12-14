import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Layout } from '../../components/Layout';
import { MarkdownTextField } from '../../components/MarkdownTextField';
import { PartsForm } from '../../components/PartsForm';
import { SharedInput } from '../../components/SharedInput';
import { ToastContext } from '../../context/ToastContext';
import { Api } from '../../utils/Api';
import { sermonCategories } from '../../utils/categories';
import { handleApiDelete } from '../../utils/handleApiDelete';
import { handleApiUpdate } from '../../utils/handleApiUpdate';

export const SermonDetailsPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const toast = React.useContext(ToastContext);

  const reduxForm = useSelector(
    (s: any) => s?.form?.partsForm?.values?.parts || [],
  );
  
  const [state, setState] = React.useState({
    title: '',
    featuredImage: '',
    category: '',
    color: '',
    content: '',
    video: '',
    categories: [],
    parts: [],
    showTitle: true,

  });

  React.useEffect(() => {
    init();
  }, [id]);

  const init = async () => {
    const { error, data } = await Api.getSermonById(id);

    if (error) {
      return;
    }

    setState({
      ...state,
      ...data,
      // parts: selectedSermon.parts || reduxForm,
      // content: selectedSermon.content || '',
    });
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

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const {
      title,
      featuredImage,
      category,
      color,
      video,
      content,
      showTitle,
    } = state;
    const data = {
      title,
      featuredImage,
      category,
      color,
      content,
      video,
      showTitle,
      parts: reduxForm,
    };

    const { success, error } = await handleApiUpdate(`/sermons/${id}`, data);

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
      const { success, error } = await handleApiDelete(`/sermons/${id}`);

      if (success) {
        toast.handleOpen('Success');
        history.push(`/dashboard/sermons`);
      }

      if (error) {
        toast.handleOpen(JSON.stringify(error));
      }
    }
  };

  return (
    <Layout title="Sermon">
    <Container fluid>
      <Row align="start" justify="start">
        <Col xs={12} sm={12} md={8} lg={6}>
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
              name="video"
              label="Video"
              value={state.video}
              onChange={handleInputChange}
            />

            <SharedInput
              type="text"
              name="featuredImage"
              label="Featured Image (thumbnail)"
              value={state.featuredImage}
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
                {sermonCategories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
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
                  label="Color"
                  name="color"
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
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={state.showTitle}
                  onChange={handleInputChange}
                  name="showTitle"
                />
              }
              label="Show title in image?"
            />

            <MarkdownTextField
              value={state.content || ''}
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
          <PartsForm parts={state.parts} />
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};
