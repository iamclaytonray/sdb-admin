import * as React from 'react';
import { Card, CardBody, CardText, CardTitle, Col } from 'reactstrap';

export const DashboardPage = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle>Dashboard</CardTitle>
        {/*  */}
        <Col lg="3">
          <Card>
            <CardBody>
              <CardText>Articles</CardText>
            </CardBody>
          </Card>
        </Col>
        {/*  */}
        <Col lg="3">
          <Card>
            <CardBody>
              <CardText>Media</CardText>
            </CardBody>
          </Card>
        </Col>
        {/*  */}
        <Col lg="3">
          <Card>
            <CardBody>
              <CardText>Products</CardText>
            </CardBody>
          </Card>
        </Col>
        {/*  */}
      </CardBody>
    </Card>
  );
};
