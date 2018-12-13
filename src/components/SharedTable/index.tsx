import { NewButton } from 'components/NewButton';
import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';

export class SharedTable extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: props.data.map((prop: any) => {
        return {
          // id: key,
          label: (
            <Link
              to={`/dashboard/${props.otherLocation}/${
                prop.slug ? prop.slug : prop._id
              }`}
            >
              {prop.title
                ? prop.title
                : prop.label
                ? prop.label
                : prop.name
                ? prop.name
                : 'Undefined prop'}
            </Link>
          ),
          slug: prop.slug ? prop.slug : prop._id,
          // fix
          category: prop.category,
          createdAt: moment(prop.createdAt).format('MM-DD-YYYY'),
        };
      }),
    };
  }
  public render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-md-12 col-lg-12">
            <div className="card-header">
              <h5 className="card-title" style={{ textAlign: 'right' }}>
                {this.props.title}
              </h5>
              <NewButton location={this.props.newLink}>
                {this.props.children}
              </NewButton>
            </div>
            <div className="card-body">
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
                    Header: 'Category',
                    accessor: 'category',
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
