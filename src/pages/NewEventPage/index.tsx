// import { TextEditor } from 'components/TextEditor';
import Axios from 'axios';
import { Error } from 'components/Error';
import * as moment from 'moment';
import * as React from 'react';
import * as Datetime from 'react-datetime';
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
    startDate: moment().format('MM-DD-YYYY'),
    endDate: moment().format('MM-DD-YYYY'),
    startTime: '',
    endTime: '',
    hostAddress: '',
    hostName: '',
    hostPhone: '',
    hostEmail: '',
    published: 'draft',

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
    const {
      title,
      slug,
      featuredImage,
      content,
      published,
      startDate,
      endDate,
      startTime,
      endTime,
      hostAddress,
      hostName,
      hostPhone,
      hostEmail,
    } = this.state;

    Axios.post(`${API_URL}/events`, {
      title,
      slug,
      featuredImage,
      content,
      published,
      startDate,
      endDate,
      startTime,
      endTime,
      hostAddress,
      hostName,
      hostPhone,
      hostEmail,
    })
      .then(() => {
        this.props.history.push(`/dashboard/events`);
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

            <FormGroup>
              <Label>Start Date</Label>
              <Datetime
                timeFormat={false}
                inputProps={{ placeholder: 'Start Date' }}
                // value={this.state.startDate}
                // onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>End Date</Label>
              <Datetime
                timeFormat={false}
                inputProps={{ placeholder: 'End Date' }}
                // value={}
                defaultValue={this.state.endDate}
              />
            </FormGroup>

            <FormGroup>
              <Label>Start Time</Label>
              <Datetime
                dateFormat={false}
                inputProps={{ placeholder: 'Start Time' }}
                // value={}
                defaultValue={this.state.startTime}
              />
            </FormGroup>

            <FormGroup>
              <Label>End Time</Label>
              <Datetime
                dateFormat={false}
                inputProps={{ placeholder: 'End Time' }}
                defaultValue={this.state.endTime}
              />
            </FormGroup>

            <FormGroup>
              <Label>Host Address</Label>
              <Input
                type="text"
                name="hostAddress"
                placeholder="Host Address"
                value={this.state.hostAddress}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Host Name</Label>
              <Input
                type="text"
                name="hostName"
                placeholder="Host Name"
                value={this.state.hostName}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Host Phone</Label>
              <Input
                type="text"
                name="hostPhone"
                placeholder="Host Phone"
                value={this.state.hostPhone}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Host Email</Label>
              <Input
                type="text"
                name="hostEmail"
                placeholder="Host Email"
                value={this.state.hostEmail}
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
