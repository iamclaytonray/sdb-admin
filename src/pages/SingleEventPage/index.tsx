import Axios from 'axios';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
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

class SingleEvent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: props.event.title,
      slug: props.event.slug,
      featuredImage: props.event.featuredImage,
      content: props.event.content,
      startDate: props.event.startDate,
      endDate: props.event.endDate,
      startTime: props.event.startTime,
      endTime: props.event.endTime,
      hostName: props.event.hostName,
      hostAddress: props.event.hostAddress,
      hostPhone: props.event.hostPhone,
      hostEmail: props.event.hostEmail,
      published: props.event.published,

      error: null,
    };
  }

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = (e: any) => {
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
      address,
      host,
      phone,
      email,
    } = this.state;
    Axios.put(`${API_URL}/events/${this.props.match.params.slug}`, {
      title,
      slug,
      featuredImage,
      content,
      published,
      startDate,
      endDate,
      startTime,
      endTime,
      address,
      host,
      phone,
      email,
    })
      .then(() => this.props.history.push('/dashboard/events'))
      .catch(err => {
        this.setState({ error: err.response.data.error });
        window.scroll(0, 0);
      });
  }

  public handleDelete = () => {
    alert('Are you sure?');
    Axios.delete(`${API_URL}/events/${this.props.match.params.slug}`)
      .then(() => this.props.history.push('/dashboard/events'))
      .catch(err => {
        this.setState({ error: err.response.data.error });
        window.scroll(0, 0);
      });
  }

  public render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Update Event</CardTitle>
          {this.state.error && (
            <Error error={JSON.stringify(this.state.error)} />
          )}
          <Form>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Slug</Label>
              <Input
                type="text"
                name="slug"
                value={this.state.slug}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Featured Image</Label>
              <br />
              <img
                src={this.state.featuredImage}
                style={{ height: 100, width: 'auto' }}
              />
              <p />
              <Input
                name="featuredImage"
                type="text"
                value={this.state.featuredImage}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <div className="form-check">
                <Label className="form-check-label">Published</Label>
                <Input
                  name="published"
                  type="checkbox"
                  checked={this.state.published}
                  onChange={this.handleInputChange}
                />
              </div>
            </FormGroup>

            <FormGroup>
              <Label>Content</Label>
              <textarea
                name="content"
                value={this.state.content}
                onChange={this.handleInputChange}
                className="form-control"
                rows={10}
              />
            </FormGroup>

            {/* Time Info */}
            <h3>Time Info</h3>

            <FormGroup>
              <Label>Start Date</Label>
              <Datetime
                timeFormat={false}
                inputProps={{ placeholder: 'Start Date' }}
                value={this.state.startDate}
                onChange={(event: any) =>
                  this.setState({ startDate: event.target })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>End Date</Label>
              <Datetime
                timeFormat={false}
                inputProps={{ placeholder: 'End Date' }}
                value={this.state.endDate}
                onChange={(event: any) =>
                  this.setState({ startDate: event.target })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Start Time</Label>
              <Datetime
                dateFormat={false}
                inputProps={{ placeholder: 'Start Time' }}
                value={this.state.startTime}
              />
            </FormGroup>

            <FormGroup>
              <Label>End Time</Label>
              <Datetime
                dateFormat={false}
                inputProps={{ placeholder: 'End Time' }}
                value={this.state.endTime}
              />
            </FormGroup>

            {/* Host Info */}
            <h3>Host Info</h3>
            <FormGroup>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                placeholder="Address"
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

            <Button color="danger" onClick={this.handleDelete}>
              Delete
            </Button>

            <Button color="primary" onClick={this.handleUpdate}>
              Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export class SingleEventPage extends React.Component<any, any> {
  public state = {
    loading: true,
    error: null,
    event: {},
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/events/${this.props.match.params.slug}`)
      .then(res => {
        this.setState({
          loading: false,
          event: res.data.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return <SingleEvent event={this.state.event} {...this.props} />;
  }
}
