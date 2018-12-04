// import { TextEditor } from 'components/TextEditor';
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

export class NewEventPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    content: '',

    error: null,
  };

  public onEditorChange = editor => this.setState({ editor });

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
    const { title, slug, featuredImage, content } = this.state;

    Axios.post(
      `${API_URL}/events`,
      {
        title,
        slug,
        featuredImage,
        content,
        orderNumber: Math.round(Math.random() * 1000),
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
      .then(() => {
        this.props.history.push(`/dashboard/events`);
      })
      .catch(error => {
        this.setState({ error: error.response.data.message });
        window.scroll(0, 0);
      });
  }

  public render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>New Event</CardTitle>
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
              <Label>Content</Label>
              <Input
                type="text"
                name="content"
                placeholder="Content"
                value={this.state.content}
                className="form-control"
                onChange={this.handleInputChange}
              />
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
