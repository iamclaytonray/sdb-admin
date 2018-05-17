import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { DeleteContainer } from 'containers/DeleteContainer';
import { UpdateContainer } from 'containers/UpdateContainer';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  query service($slug: String!) {
    service(where: { slug: $slug }) {
      title
      slug
      category
      content
      videoUri
      published
    }
  }
`;

const updateServiceMutation = gql`
  mutation updateService(
    $title: String!
    $slug: String!
    $category: String!
    $content: String!
    $videoUri: String!
  ) {
    updateService(
      where: { slug: $slug }
      data: {
        title: $title
        slug: $slug
        category: $category
        content: $content
        videoUri: $videoUri
      }
    ) {
      id
    }
  }
`;

const deleteServiceMutation = gql`
  mutation deleteService($slug: String!) {
    deleteService(where: { slug: $slug }) {
      id
    }
  }
`;

export class SingleServicePage extends React.Component<any, any> {
  public state = {
    title: ''
  };

  // public static getDerivedStateFromProps(nextProps, prevState) {
    
  // }
  
  public handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
  
    this.setState({
      [name]: value,
    });
  }

  public render() {
    const { match, history } = this.props;
    return (
      <Query query={query} variables={{ slug: match.params.slug }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }

          const { service } = data;

          return (
            <React.Fragment>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={service.title}
                  className="form-control"
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Slug</label>
                <input
                  type="text"
                  value={service.slug}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Video URI</label>
                <input
                  type="text"
                  value={service.videoUri}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={service.category}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Published</label>
                <input
                  type="checkbox"
                  checked={service.published}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={service.content}
                  className="form-control"
                  rows={10}
                />
              </div>

              <UpdateContainer
                mutationName={updateServiceMutation}
                variables={service}
              />
              <DeleteContainer
                mutationName={deleteServiceMutation}
                variable={service.slug}
                history={history}
              />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
