import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';

import { ColorSwatch } from '../../components/ColorSwatch';
import { MarkdownTextField } from '../../components/MarkdownTextField';
import { PartsForm } from '../../components/PartsForm';
import { SharedInput } from '../../components/SharedInput';
import { sermonCategories } from '../../utils/categories';

interface Props {
  mode: 'create' | 'update';
  form: any;
  handleCreate?: any;
  handleUpdate?: any;
  handleDelete?: any;
}

export const SermonForm: React.FC<Props> = ({
  mode,
  form,
  handleCreate,
  handleUpdate,
  handleDelete,
}) => {
  const {
    title,
    featuredImage,
    category,
    color,
    content,
    video,
    // categories,
    parts,
    // showTitle,
  } = form.values;

  return (
    <Container fluid>
      <Row align="start" justify="start">
        <Col xs={12} sm={12} md={8} lg={6}>
          <form
            style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
            onSubmit={mode === 'create' ? handleCreate : handleUpdate}
          >
            <SharedInput
              type="text"
              name="title"
              label="Title"
              value={title}
              onChange={form.handleChange}
            />
            <SharedInput
              type="text"
              name="video"
              label="Video"
              value={video}
              onChange={form.handleChange}
            />
            <SharedInput
              type="text"
              name="featuredImage"
              label="Featured Image (thumbnail)"
              value={featuredImage}
              onChange={form.handleChange}
            />

            <FormControl variant="outlined" margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={category}
                onChange={form.handleChange}
                name="category"
              >
                {sermonCategories.map((cat) => (
                  <MenuItem value={cat.value}>{cat.label}</MenuItem>
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
                  value={color}
                  onChange={form.handleChange}
                >
                  <MenuItem value="#B56FEA">Light Purple</MenuItem>
                  <MenuItem value="#5A17C7">Purple</MenuItem>
                  <MenuItem value="#031AF7">Dark Blue</MenuItem>
                  <MenuItem value="#08D316">Green</MenuItem>
                  <MenuItem value="#00ADFF">Light Blue</MenuItem>
                  <MenuItem value="#FF4600">Orange</MenuItem>
                </Select>
              </FormControl>
              <ColorSwatch color={color} />
            </div>

            <MarkdownTextField
              value={content}
              onChange={(text: string) => form.setFieldValue('content', text)}
            />

            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                {mode === 'update' && (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Button color="primary" variant="contained" type="submit">
                  {mode === 'create' ? 'Create' : 'Update'}
                </Button>
              </div>
            </div>
          </form>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} style={{ marginTop: 16 }}>
          <PartsForm
            parts={parts}
            handleChange={form.handleChange}
            setFieldValue={form.setFieldValue}
          />
        </Col>
      </Row>
    </Container>
  );
};
