import { Button, Card } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Error } from '../../components/Error';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';
import { ToastContext } from '../../context/ToastContext';

export const EventDetailsPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const toast = React.useContext(ToastContext);
  const selectedEvent = useSelector(
    (s: any) => s.events.allEvents[id as string],
  );

  const [state, setState] = React.useState({
    title: '',
    slug: '',
    featuredImage: '',
    content: '',

    error: null,
  });

  React.useEffect(() => {
    initData();
  },              [id]);

  const initData = () => {
    setState({
      ...state,
      ...selectedEvent,
    });
  };

  const handleInputChange = (event) => {
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
    const { title, slug, featuredImage, content } = state;
    try {
      Axios.put(
        `${API_URL}/events/${id}`,
        {
          title,
          slug,
          featuredImage,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
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
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(`${API_URL}/events/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        history.push(`/dashboard/events`);

        toast.handleOpen('Success');
      } catch (error) {
        const errorMessage = error?.response?.data?.message;
        toast.handleOpen(JSON.stringify(errorMessage));
        setState({ ...state, error: errorMessage });
        window.scroll(0, 0);
      }
      return;
    }
  };

  return (
    <Container fluid>
      <Row align="center" justify="center">
        <Col lg={8}>
          <Card style={{ padding: 24 }}>
            {state.error && <Error error={JSON.stringify(state.error)} />}
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
