import { CustomButton as Button } from 'components/CustomButton';
import * as React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

export const LoginPage = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle>Login</CardTitle>
        <input
          className="form-control"
          name=""
          defaultValue="shoreshdavidbrandon"
        />
        <br />
        <input
          className="form-control"
          name="password"
          placeholder="Password"
          defaultValue="password"
        />
        <Button className="btn btn-primary">Login</Button>
      </CardBody>
    </Card>
  );
};
