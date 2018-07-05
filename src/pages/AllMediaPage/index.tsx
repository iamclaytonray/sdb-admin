import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { NewButton } from 'components/NewButton';
// import { Media } from 'components/Media';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

const query = gql`
  {
    medias {
      id
      createdAt
      slug
      mediaUri
    }
  }
`;

export const AllMediasPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
        <NewButton location="/dashboard/media/new">New Media</NewButton>
      </CardHeader>
      <CardBody>
        <Row>
          <Query query={query}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Loading />;
              }

              if (error) {
                return <Error error={error} />;
              }

              return data.medias.map(media => {
                return (
                  <Col lg="3" key={media.id} style={{ marginBottom: 50 }}>
                    <img
                      src={media.mediaUri}
                      alt={media.description}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </Col>
                );
              });
            }}
          </Query>
        </Row>
      </CardBody>
    </Card>
  );
};
