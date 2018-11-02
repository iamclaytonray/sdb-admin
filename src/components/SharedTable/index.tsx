import { NewButton } from 'components/NewButton';
import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

export class SharedTable extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: props.data.map((prop, key) => {
        return {
          // id: key,
          label: (
            <Link to={`/dashboard/${props.otherLocation}/${prop.slug ? prop.slug : prop._id}`}>
              {prop.title
                ? prop.title
                : (prop.label)
                ? prop.label
                : (prop.name)
                ? prop.name
                : 'Undefined prop'
              }
            </Link>
          ),
          slug: prop.slug ? prop.slug : prop._id,
          // fix
          published: prop.published,
          createdAt: moment(prop.createdAt).format('MM-DD-YYYY'),
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
                      Header: 'Label',
                      accessor: 'label',
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
                      Header: 'Created At',
                      accessor: 'createdAt',
                    },
                  ]}
                  defaultPageSize={20}
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
