import { Button } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Error } from '../../components/Error';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';

export const CreateEventPage = () => {
  const history = useHistory();
  const [state, setState] = React.useState({
    title: '',
    slug: '',
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
    const { title, slug, featuredImage, content } = state;

    try {
      // const { res, error } = await Api.createEvent({
      //   title,
      //   slug,
      //   featuredImage,
      //   content,
      // });
      await Axios.post(
        `${API_URL}/events`,
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

        <Button color="primary" variant="contained" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};
