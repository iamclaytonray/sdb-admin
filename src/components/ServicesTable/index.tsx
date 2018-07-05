import * as React from 'react';
import ReactTable from 'react-table';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

import { CustomButton as Button } from 'components/CustomButton';
import { NewButton } from 'components/NewButton';
import { Link } from 'react-router-dom';
// import { PanelHeader } from 'components/PanelHeader';

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
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
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
              {/* use this button to remove the data row */}
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
        {/* <PanelHeader /> */}
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
