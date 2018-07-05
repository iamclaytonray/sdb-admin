import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Card, CardBody, CardTitle, FormGroup, Label } from 'reactstrap';

const mutation = gql`
  mutation createMedia(
    $mediaUri: String!
    $slug: String!
    $description: String!
  ) {
    createMedia(
      data: {
        mediaUri: $mediaUri
        slug: $slug
        description: $description
      }
    ) {
      id
      slug
      mediaUri
    }
  }
`;

export class NewMediaPage extends React.Component<any, any> {
  public state = {
    mediaUri: '',
    slug: '',
    description: '',
  };

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = (e, createMedia): any => {
    e.preventDefault();
    const {
      mediaUri,
      slug,
      description,
    } = this.state;
    createMedia({
      variables: {
        mediaUri,
        slug,
        description,
      },
    }).then(data => {
      console.log(data);
      // this.props.history.push(`/dashboard/media`);
    });
  }
  public render() {
    console.log(this.state);
    return (
      <Mutation mutation={mutation}>
        {(createMedia, { loading, error }) => {
          return (
            <Card>
              <CardBody>
                <CardTitle>New Media</CardTitle>

                {loading && <Loading />}
                {/* Add a Snackbox here noticing the user that there was an error */}
                {error && <Error error={error} />}
                <form onSubmit={e => this.handleSubmit(e, createMedia)}>

                  <FormGroup>
                    <Label>Media URI</Label>
                    <input
                      type="text"
                      name="mediaUri"
                      placeholder="Media URI"
                      value={this.state.mediaUri}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Slug</Label>
                    <input
                      type="text"
                      name="slug"
                      placeholder="Slug"
                      value={this.state.slug}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Description</Label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={this.state.description}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                    </FormGroup>

                  <Button color="primary" type="submit">
                    Create
                  </Button>
                </form>
              </CardBody>
            </Card>
          );
        }}
      </Mutation>
    );
  }
}
