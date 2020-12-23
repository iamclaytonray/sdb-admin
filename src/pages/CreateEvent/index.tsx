import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { MarkdownTextField } from '../../components/MarkdownTextField';
import { SharedInput } from '../../components/SharedInput';
import { Api } from '../../utils/Api';

export const CreateEvent = () => {
  const history = useHistory();
  const eventsLength = useSelector(
    (s: any) => Object.values(s.events.allEvents || {}).length,
  );

  const form = useFormik({
    initialValues: {
      title: '',
      featuredImage: '',
      content: '',
    },
    // tslint:disable-next-line:no-empty
    onSubmit: () => {},
  });

  const { title, featuredImage, content } = form.values;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await Api.createEvent({
      title,
      featuredImage,
      content,
      order: eventsLength,
    });

    history.push(`/dashboard/events`);
  };

  return (
    <Layout title="Create Event">
      <Container fluid>
        <Row align="center" justify="center">
          <Col lg={8}>
            <form onSubmit={handleSubmit}>
              <SharedInput
                type="text"
                name="title"
                label="Title"
                value={title}
                onChange={form.handleChange}
              />

              <SharedInput
                type="text"
                name="featuredImage"
                label="Featured Image (thumbnail)"
                value={featuredImage}
                onChange={form.handleChange}
              />

              <MarkdownTextField
                value={content}
                onChange={(text: string) => form.setFieldValue('content', text)}
              />

              <Button color="primary" variant="contained" type="submit">
                Create
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
