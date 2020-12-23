import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/img/logo.png';
import { SharedInput } from '../../components/SharedInput';
import { ToastContext } from '../../context/ToastContext';
import { Api } from '../../utils/Api';

export const Login = () => {
  const history = useHistory();
  const toast = React.useContext(ToastContext);

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // tslint:disable-next-line:no-empty
    onSubmit: () => {},
  });

  const { email, password } = form.values;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error, data } = await Api.login(email, password);

    if (error) {
      toast.open({ message: error });
      return;
    }

    localStorage.setItem('token', data.token);
    toast.open({ message: 'Success' });
    history.push(`/dashboard/sermons`);
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
              value={email}
              onChange={form.handleChange}
            />
            <SharedInput
              label="Password"
              name="password"
              placeholder="Password"
              value={password}
              type="password"
              onChange={form.handleChange}
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
