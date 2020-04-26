import { Button } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Error } from '../../components/Error';
import { MarkdownTextField } from '../../components/MarkdownTextField';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';
import { authHeader } from '../../utils/authHeader';

export const CreateEventPage = () => {
  const history = useHistory();
  const eventsLength = useSelector(
    (s: any) => Object.values(s.events.allEvents || {}).length,
  );
  const [state, setState] = React.useState({
    title: '',
    featuredImage: '',
    content: '',

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
    const { title, featuredImage, content } = state;

    try {
      await Axios.post(
        `${API_URL}/events`,
        {
          title,
          featuredImage,
          content,
          order: eventsLength,
        },
        authHeader,
      );

      history.push(`/dashboard/events`);
    } catch (error) {
      setState({ ...state, error: error.response.data.message });
      window.scroll(0, 0);
    }
  };

  return (
    <div>
      {state.error && <Error error={JSON.stringify(state.error)} />}
      <form onSubmit={handleSubmit}>
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

        <Button color="primary" variant="contained" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};
