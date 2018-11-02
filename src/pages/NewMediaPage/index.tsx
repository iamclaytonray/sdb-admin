import Axios from 'axios';
import { Error } from 'components/Error';
import * as React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
} from 'reactstrap';
import { API_URL } from '../../constants';

export class NewMediaPage extends React.Component<any, any> {
  public state = {
    mediaUri: '',
    slug: '',
    description: '',
    error: null,
  };

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = (e): any => {
    e.preventDefault();
    const { mediaUri, slug, description } = this.state;
    Axios.post(`${API_URL}/media`, { mediaUri, slug, description })
      .then(() => this.props.history.push('/dashboard/media'))
      .catch(err => {
        this.setState({ error: err.response.data.error });
        window.scroll(0, 0);
      });
  }

  public render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>New Media</CardTitle>
          {this.state.error && <Error error={this.state.error} />}

          <form onSubmit={e => this.handleSubmit(e)}>
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
  }
}
