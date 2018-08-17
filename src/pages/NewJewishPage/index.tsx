import Axios from 'axios';
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
import { slugify } from '../../utils/slugify';

export class NewJewishPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    description: '',
    featuredImage: '',
    link: '',
    published: false,
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
      .then(res => {
        this.props.history.push(`/dashboard/jewish`);
      })
      .catch(err => this.setState({ error: err }));
  }
  public render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>New Jewish</CardTitle>

          <form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
              <Label>Title</Label>
              <input
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
              <input
                type="text"
                name="slug"
                placeholder="Slug"
                value={slugify(this.state.title)}
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

            <FormGroup>
              <Label>Featured Image</Label>
              <input
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
              <input
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
              <input
                type="checkbox"
                name="published"
                placeholder="Published"
                checked={this.state.published}
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
