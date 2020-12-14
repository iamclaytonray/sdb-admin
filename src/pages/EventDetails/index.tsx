import { Button } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useHistory, useParams } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { MarkdownTextField } from '../../components/MarkdownTextField';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';
import { ToastContext } from '../../context/ToastContext';
import { Api } from '../../utils/Api';
import { authHeader } from '../../utils/authHeader';
import { handleApiDelete } from '../../utils/handleApiDelete';

export const EventDetailsPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const toast = React.useContext(ToastContext);

  const [state, setState] = React.useState({
    title: '',
    featuredImage: '',
    content: '',

    error: null,
  });

  React.useEffect(() => {
    init();
  }, [id]);

  const init = async () => {
    const { error, data } = await Api.getEventById(id);
    if (error) {
      return;
    }

    setState({
      ...state,
      ...data,
    });
  };

  const handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    const { title, featuredImage, content } = state;
    try {
      Axios.put(
        `${API_URL}/events/${id}`,
        {
          title,
          featuredImage,
          content,
        },
        authHeader,
      );
      toast.handleOpen('Success');
      history.push('/dashboard/events');
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.handleOpen(JSON.stringify(errorMessage));
      setState({ ...state, error: errorMessage });
      window.scroll(0, 0);
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm(
      'Are you sure? This action cannot be undone.',
    );
    if (confirm) {
      const { success, error } = await handleApiDelete(`/events/${id}`);

      if (success) {
        toast.handleOpen('Success');
        history.push(`/dashboard/events`);
      }

      if (error) {
        toast.handleOpen(JSON.stringify(error));
      }
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

              <MarkdownTextField
                value={state.content}
                onChange={(content: string) => setState({ ...state, content })}
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
