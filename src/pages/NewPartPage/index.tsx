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

export class NewPartPage extends React.Component<any, any> {
  public state = {
    title: '',
    anchorLink: '',
    mediumLink: '',
    youtubeLink: '',
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
      anchorLink,
      mediumLink,
      youtubeLink,
      published,
    } = this.state;
    Axios.post(`${API_URL}/parts`, {
      title,
      anchorLink,
      mediumLink,
      youtubeLink,
      published,
    })
      .then(() => {
        this.props.history.push(`/dashboard/parts`);
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
          <CardTitle>New Part</CardTitle>
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

            <Button type="submit" color="primary">
              Create
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
