import { CustomButton as Button } from 'components/CustomButton';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Card, CardBody, CardTitle, Form, Input } from 'reactstrap';

interface Props {
  history: any;
  onSubmit: () => void;
}

interface State {
  email: string;
  password: string;
}

const mutation = gql`
mutation {
  login(data: {
    email: "iamclaytonray@gmail.com",
    password: "password"
  }) {
    token
    user {
      id
    }
  }
}
`;

export class LoginPage extends React.Component<Props, State> {
  public state = {
    email: 'iamclaytonray@gmail.com',
    password: 'password',
  };
  public handleSubmit = (e, createArticle): any => {
    e.preventDefault();
    const {
      email,
      password
    } = this.state;
    createArticle({
      variables: {
        email,
        password,
      },
    }).then((data) => {
      localStorage.setItem('token', data.data.login.token);
      this.props.history.push(`/dashboard`);
    })
    .catch(error => console.log(error));
  }
  public render() {
    return (
      <Mutation mutation={mutation}>
      {(login, {loading, error}) => {
        
        return (
      <Card>
        <CardBody>
          <CardTitle>Login</CardTitle>
          <Form onSubmit={(e) => this.handleSubmit(e, login)}>
          {loading && <Loading />}
          {error && <Error error={error} />}

          <Input
            className="form-control"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <br />
          <Input
            className="form-control"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <Button className="btn btn-primary" type="submit">Login</Button>
          </Form>
        </CardBody>
      </Card>
        );
      }}
      </Mutation>
    );
  }
}
