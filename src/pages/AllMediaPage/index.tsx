import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { NewButton } from 'components/NewButton';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import { API_URL } from '../../constants';

export class AllMediasPage extends React.Component<any, any> {
  public render() {
    return (
      <Fetch url={`${API_URL}/media`} method="GET" lifecycle="onMount">
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }
          const media = data.data;
          return (
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <NewButton location="/dashboard/media/new">New Media</NewButton>
              </CardHeader>
              <CardBody>
                <Row>
                  {media.map(m => {
                    return (
                      <Col lg="3" key={m.slug} style={{ marginBottom: 50 }}>
                        <img
                          src={m.mediaUri}
                          alt={m.description}
                          style={{ height: '100%', width: '100%' }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </CardBody>
            </Card>
          );
        }}
      </Fetch>
    );
  }
}
