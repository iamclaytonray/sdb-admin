import Axios from 'axios';
import { CustomButton as Button } from 'components/CustomButton';
import * as React from 'react';
import { Card, CardBody, CardTitle, Form, Input } from 'reactstrap';
import { API_URL } from '../../constants';

// interface Props {
//   history: any;
//   onSubmit: () => void;
// }

// interface State {
//   email: string;
//   password: string;
// }

export class LoginPage extends React.Component<any, any> {
  public state = {
    email: 'rabbi@1messiah.org',
    password: 'password',
    error: null,
  };

  public handleSubmit = (e): any => {
    e.preventDefault();
    const { email, password } = this.state;
    Axios.post(`${API_URL}/auth`, { email, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        this.props.history.push(`/dashboard`);
      })
      .catch(error => this.setState({ error: error.response.data.error }));
  }
  public render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Login</CardTitle>
          {this.state.error && <p>{JSON.stringify(this.state.error)}</p>}
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Input
              className="form-control"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <br />
            <Input
              className="form-control"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Button className="btn btn-primary" type="submit">
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
