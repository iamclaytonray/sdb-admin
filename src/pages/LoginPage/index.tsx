import Axios from 'axios';
import * as React from 'react';
import { Button, Card, CardBody, CardTitle, Form, Input } from 'reactstrap';
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
    email: '',
    password: '',
    error: null,
  };

  public handleSubmit = async (e): Promise<any> => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const res = await Axios.post(`${API_URL}/auth`, { email, password });

      localStorage.setItem('token', res.data.token);
      this.props.history.push(`/dashboard`);
    } catch (error) {
      this.setState({ error: error.response.data.message });
    }
  };
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
