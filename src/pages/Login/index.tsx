import { Button } from '@material-ui/core';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/img/logo.png';
import { SharedInput } from '../../components/SharedInput';
import { ToastContext } from '../../context/ToastContext';
import { Api } from '../../utils/Api';

export const LoginPage = () => {
  const history = useHistory();
  const toast = React.useContext(ToastContext);
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error, data } = await Api.login(state.email, state.password);

    if (error) {
      return;
    }

    localStorage.setItem('token', data.token);
    toast.handleOpen('Success');
    history.push(`/dashboard`);
  };

  return (
    <Container fluid>
      <Row justify="center" align="center">
        <Col lg={4} style={{ marginTop: 24 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img src={logo} alt="" style={{ height: 200 }} />
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <SharedInput
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            <SharedInput
              label="Password"
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
        </Col>
      </Row>
    </Container>
  );
};
