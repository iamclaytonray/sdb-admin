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

export class NewServicePage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    description: '',
    featuredImage: '',
    parts: [],

    partNumber: '',
    anchorLink: 'https://anchor.fm/',
    mediumLink: 'https://medium.com/',
    youtubeLink: 'https://youtube.com/',

    error: null,
  };

  public handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = (e): any => {
    e.preventDefault();
    const {
      title,
      slug,
      category,
      description,
      featuredImage,
      parts,
    } = this.state;

    try {
      Axios.post(
        `${API_URL}/services`,
        {
          title,
          slug,
          category,
          description,
          featuredImage,
          parts,
          order: category + Math.round(Math.random() * 1000),
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );

      this.props.history.push(`/dashboard/services`);
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scroll(0, 0);
    }
  }

  public onSelectChange = (e: any) => {
    const value: any = Array.from(
      e.target.selectedOptions as HTMLOptionsCollection,
      option => option.value,
    );
    this.setState({ parts: value });
  }

  public render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>New Service</CardTitle>
          {this.state.error && <Error error={this.state.error} />}

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
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                placeholder="Category"
                value={this.state.category}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <h1>Parts:</h1>

            <FormGroup>
              <Label>Part Number</Label>
              <Input
                type="text"
                name="partNumber"
                placeholder="Part Number"
                value={this.state.partNumber}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Anchor Link</Label>
              <Input
                type="text"
                name="anchorLink"
                placeholder="Anchor Link"
                value={this.state.anchorLink}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Medium Link</Label>
              <Input
                type="text"
                name="mediumLink"
                placeholder="Medium Link"
                value={this.state.mediumLink}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>YouTube Link</Label>
              <Input
                type="text"
                name="youtubeLink"
                placeholder="YouTube Link"
                value={this.state.youtubeLink}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <Button type="submit" className="btn btn-primary">
              Create
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
