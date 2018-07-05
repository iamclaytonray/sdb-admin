import * as React from 'react';
import ReactTable from 'react-table';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

import { CustomButton as Button } from 'components/CustomButton';
import { NewButton } from 'components/NewButton';
import { Link } from 'react-router-dom';
// import { PanelHeader } from 'components/PanelHeader';

export class ProductsTable extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: props.data.map((prop, key) => {
        return {
          id: key,
          name: (
            <Link to={`/dashboard/products/${prop.slug}`}>{prop.name}</Link>
          ),
          slug: prop.slug,
          published: props.published ? 'Yes' : 'No',
          featuredImage: <img src={prop.featuredImage} height={50} />,
          actions: (
            <div className="actions-right">
              <Button
                onClick={() => {
                  console.log('hit');
                }}
                color="warning"
                size="sm"
                round
                icon
              >
                <i className="fa fa-edit" />
              </Button>{' '}
              <Button
                onClick={() => {
                  console.log('hit');
                }}
                color="danger"
                size="sm"
                round
                icon
              >
                <i className="fa fa-times" />
              </Button>{' '}
            </div>
          ),
        };
      }),
    };
  }
  public render() {
    return (
      <div>
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
                        Header: 'Name',
                        accessor: 'name',
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
                      {
                        Header: 'Actions',
                        accessor: 'actions',
                        sortable: false,
                        filterable: false,
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
      </div>
    );
  }
}
