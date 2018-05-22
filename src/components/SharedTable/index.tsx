import * as React from 'react';
// react component for creating dynamic tables
import ReactTable from 'react-table';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

import { CustomButton as Button } from 'components/CustomButton';
import { NewButton } from 'components/NewButton';
import { Link } from 'react-router-dom';
// import { PanelHeader } from 'components/PanelHeader';

// const dataTable = [
//   ['Tiger Nixon', 'System Architect', 'Edinburgh', '61'],
//   ['Garrett Winters', 'Accountant', 'Tokyo', '63'],
//   ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '66'],
//   ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '22'],
//   ['Airi Satou', 'Accountant', 'Tokyo', '33'],
//   ['Brielle Williamson', 'Integration Specialist', 'New York', '61'],
//   ['Herrod Chandler', 'Sales Assistant', 'San Francisco', '59'],
//   ['Rhona Davidson', 'Integration Specialist', 'Tokyo', '55'],
//   ['Colleen Hurst', 'Javascript Developer', 'San Francisco', '39'],
//   ['Sonya Frost', 'Software Engineer', 'Edinburgh', '23'],
//   ['Jena Gaines', 'Office Manager', 'London', '30'],
//   ['Quinn Flynn', 'Support Lead', 'Edinburgh', '22'],
//   ['Charde Marshall', 'Regional Director', 'San Francisco', '36'],
//   ['Haley Kennedy', 'Senior Marketing Designer', 'London', '43'],
//   ['Tatyana Fitzpatrick', 'Regional Director', 'London', '19'],
//   ['Michael Silva', 'Marketing Designer', 'London', '66'],
//   ['Paul Byrd', 'Chief Financial Officer (CFO)', 'New York', '64'],
//   ['Gloria Little', 'Systems Administrator', 'New York', '59'],
//   ['Bradley Greer', 'Software Engineer', 'London', '41'],
//   ['Dai Rios', 'Personnel Lead', 'Edinburgh', '35'],
//   ['Jenette Caldwell', 'Development Lead', 'New York', '30'],
//   ['Yuri Berry', 'Chief Marketing Officer (CMO)', 'New York', '40'],
//   ['Caesar Vance', 'Pre-Sales Support', 'New York', '21'],
//   ['Doris Wilder', 'Sales Assistant', 'Sidney', '23'],
//   ['Angelica Ramos', 'Chief Executive Officer (CEO)', 'London', '47'],
//   ['Gavin Joyce', 'Developer', 'Edinburgh', '42'],
//   ['Jennifer Chang', 'Regional Director', 'Singapore', '28'],
//   ['Brenden Wagner', 'Software Engineer', 'San Francisco', '28'],
//   ['Fiona Green', 'Chief Operating Officer (COO)', 'San Francisco', '48'],
//   ['Shou Itou', 'Regional Marketing', 'Tokyo', '20'],
//   ['Michelle House', 'Integration Specialist', 'Sidney', '37'],
//   ['Suki Burks', 'Developer', 'London', '53'],
//   ['Prescott Bartlett', 'Technical Author', 'London', '27'],
//   ['Gavin Cortez', 'Team Leader', 'San Francisco', '22'],
//   ['Martena Mccray', 'Post-Sales support', 'Edinburgh', '46'],
//   ['Unity Butler', 'Marketing Designer', 'San Francisco', '47'],
//   ['Howard Hatfield', 'Office Manager', 'San Francisco', '51'],
//   ['Hope Fuentes', 'Secretary', 'San Francisco', '41'],
//   ['Vivian Harrell', 'Financial Controller', 'San Francisco', '62'],
//   ['Timothy Mooney', 'Office Manager', 'London', '37'],
//   ['Jackson Bradshaw', 'Director', 'New York', '65'],
//   ['Olivia Liang', 'Support Engineer', 'Singapore', '64'],
// ];

export class SharedTable extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: props.data.map((prop, key) => {
        console.log(prop);
        return {
          id: key,
          title: <Link to={prop.slug}>{prop.title}</Link>,
          slug: prop.slug,
          published: props.published,
          featuredImage: <img src={prop.featuredImage} height={50} />,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                onClick={() => { console.log('hit'); }}
                color="warning"
                size="sm"
                round
                icon
              >
                <i className="fa fa-edit" />
              </Button>{' '}
              {/* use this button to remove the data row */}
              <Button
                onClick={() => { console.log('hit'); }}
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
