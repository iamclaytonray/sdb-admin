import { Button } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';

export const LoginPage = () => {
  const history = useHistory();
  const [state, setState] = React.useState({
    email: '',
    password: '',
    error: null,
  });

  const handleSubmit = async (e): Promise<any> => {
    e.preventDefault();
    const { email, password } = state;
    try {
      const res = await Axios.post(`${API_URL}/auth`, { email, password });

      localStorage.setItem('token', res.data.token);
      history.push(`/dashboard`);
    } catch (error) {
      setState({ ...state, error: error.response.data.message });
    }
  };

  return (
    <div className="container-fluid">
      <h1>Login</h1>
      {state.error && <p>{JSON.stringify(state.error)}</p>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <SharedInput
          name="email"
          type="email"
          required
          autoComplete="email"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
        <SharedInput
          name="password"
          placeholder="Password"
          value={state.password}
          type="password"
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
        <Button color="primary" variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};
