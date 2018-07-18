import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';

export const DashboardPage = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle>Dashboard</CardTitle>
        <Row>
          {/*  */}
          <Col lg="3">
            <Link to="/dashboard/articles/">
              <Card>
                <CardBody>
                  <CardTitle>Articles</CardTitle>
                </CardBody>
              </Card>
            </Link>
          </Col>
          {/*  */}
          <Col lg="3">
            <Card>
              <CardBody>
                <CardTitle>Media</CardTitle>
              </CardBody>
            </Card>
          </Col>
          {/*  */}
          <Col lg="3">
            <Card>
              <CardBody>
                <CardTitle>Products</CardTitle>
              </CardBody>
            </Card>
          </Col>
          {/*  */}
        </Row>
      </CardBody>
    </Card>
  );
};
