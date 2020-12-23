import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { MarkdownTextField } from '../../components/MarkdownTextField';
import { SharedInput } from '../../components/SharedInput';
import { ToastContext } from '../../context/ToastContext';
import { Api } from '../../utils/Api';

export const EventDetails = ({ match }) => {
  const history = useHistory();
  const toast = React.useContext(ToastContext);

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

  React.useEffect(() => {
    init();
  }, [match.params.id]);

  const init = async () => {
    const { error, data } = await Api.getEventById(match.params.id);

    if (error) {
      toast.open({ message: error });
      return;
    }

    form.setValues({
      ...data,
    });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const { error } = await Api.updateEvent(match.params.id, {
      title,
      featuredImage,
      content,
    });

    if (error) {
      toast.open({ message: error });
      return;
    }

    toast.open({ message: 'Success' });
    history.push('/dashboard/events');
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm(
      'Are you sure? This action cannot be undone.',
    );
    if (confirm) {
      const { error } = await Api.deleteEvent(match.params.id);

      if (error) {
        toast.open({ message: error });
        return;
      }

      toast.open({ message: 'Success' });
      history.push(`/dashboard/events`);
    }
  };

  return (
    <Layout title="Event">
      <Container fluid>
        <Row align="center" justify="center">
          <Col lg={8}>
            <form>
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
    </Layout>
  );
};
