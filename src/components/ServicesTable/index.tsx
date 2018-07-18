import { NewButton } from 'components/NewButton';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

export class ServicesTable extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: props.data.map((prop, key) => {
        return {
          id: key,
          title: (
            <Link to={`/dashboard/services/${prop.slug}`}>{prop.title}</Link>
          ),
          slug: prop.slug,
          published: props.published ? 'Yes' : 'No',
          featuredImage: <img src={prop.featuredImage} height={50} />,
        };
      }),
    };
  }
  public render() {
    return (
      <div>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle>{this.props.title}</CardTitle>
                <NewButton location={this.props.location}>
                  {this.props.children}
                </NewButton>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.state.data}
                  filterable
                  columns={[
                    {
                      Header: 'Title',
                      accessor: 'title',
                    },
                    {
                      Header: 'Slug',
                      accessor: 'slug',
                    },
                    {
                      Header: 'Published',
                      accessor: 'published',
                    },
                    {
                      Header: 'Featured Image',
                      accessor: 'featuredImage',
                    },
                  ]}
                  defaultPageSize={10}
                  showPaginationTop={false}
                  showPaginationBottom={true}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
