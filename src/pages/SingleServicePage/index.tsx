import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { DeleteContainer } from 'containers/DeleteContainer';
import { UpdateContainer } from 'containers/UpdateContainer';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Card, CardBody, Form, FormGroup, Input, Label } from 'reactstrap';

const query = gql`
  query service($slug: String!) {
    service(where: { slug: $slug }) {
      title
      slug
      category
      # content
      anchorLink
      mediumLink
      youtubeLink
      published
    }
  }
`;

const updateServiceMutation = gql`
  mutation updateService(
    $title: String!
    $slug: String!
    $category: String!
    # $content: String!
    $anchorLink: String!
    $mediumLink: String!
    $youtubeLink: String!
  ) {
    updateService(
      where: { slug: $slug }
      data: {
        title: $title
        slug: $slug
        category: $category
        # content: $content
        anchorLink: $anchorLink
        mediumLink: $mediumLink
        youtubeLink: $youtubeLink
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
    title: '',
  };

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
            <Card>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      type="text"
                      name="title"
                      value={service.title}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Slug</Label>
                    <Input
                      type="text"
                      value={service.slug}
                      className="form-control"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Anchor Link</Label>
                    <Input
                      type="text"
                      value={service.anchorLink}
                      className="form-control"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Medium Link</Label>
                    <Input
                      type="text"
                      value={service.mediumLink}
                      className="form-control"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>YouTube Link</Label>
                    <Input
                      type="text"
                      value={service.youtubeLink}
                      className="form-control"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Category</Label>
                    <Input
                      type="text"
                      value={service.category}
                      className="form-control"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Published</Label>
                    <Input
                      type="checkbox"
                      checked={service.published}
                      className="form-control"
                    />
                  </FormGroup>

                  {/* <FormGroup>
                  <Label>Content</Label>
                  <textarea
                    value={service.content}
                    className="form-control"
                    rows={10}
                  />
                </FormGroup> */}
                </Form>

                <UpdateContainer
                  mutationName={updateServiceMutation}
                  variables={service}
                />
                <DeleteContainer
                  mutationName={deleteServiceMutation}
                  variable={service.slug}
                  history={history}
                />
              </CardBody>
            </Card>
          );
        }}
      </Query>
    );
  }
}
