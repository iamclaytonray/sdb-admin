import Axios from 'axios';
import { Error } from 'components/Error';
import * as React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { API_URL } from '../../constants';

export class NewJewishPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    description: '',
    featuredImage: '',
    link: '',
    published: 'draft',

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
    const {
      title,
      slug,
      description,
      featuredImage,
      link,
      published,
    } = this.state;

    Axios.post(`${API_URL}/jewish`, {
      title,
      slug,
      description,
      featuredImage,
      link,
      published,
    })
      .then(() => {
        this.props.history.push(`/dashboard/jewish`);
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        window.scroll(0, 0);
      });
  }
  public render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>New Jewish</CardTitle>
          {this.state.error && (
            <Error error={JSON.stringify(this.state.error)} />
          )}

          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={this.state.title}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Slug</Label>
              <Input
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
              <Input
                type="text"
                name="description"
                placeholder="Description"
                value={this.state.description}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Featured Image</Label>
              <Input
                type="text"
                name="featuredImage"
                placeholder="Featured Image"
                value={this.state.featuredImage}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Link</Label>
              <Input
                type="text"
                name="link"
                placeholder="Link"
                value={this.state.link}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Published</Label>
              <Input
                name="published"
                type="select"
                onChange={this.handleInputChange}
                className="form-control"
              >
                <option>Published</option>
                <option>Draft</option>
              </Input>
            </FormGroup>

            <Button color="primary" type="submit">
              Create
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
