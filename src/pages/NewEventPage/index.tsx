import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { TextEditor } from 'components/TextEditor';
// import { Editor, EditorState } from 'draft-js';
import gql from 'graphql-tag';
import * as moment from 'moment';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import * as Datetime from 'react-datetime';
import { Button, Card, CardBody, CardTitle, FormGroup, Label } from 'reactstrap';
import { slugify } from '../../utils/slugify';

const mutation = gql`
  mutation createEvent(
    $title: String!
    $slug: String!
    $content: String!
    $featuredImage: String!
    $published: Boolean!
  ) {
    createEvent(
      data: {
        title: $title
        slug: $slug
        content: $content
        featuredImage: $featuredImage
        published: $published
      }
    ) {
      id
      slug
    }
  }
`;

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
    address: '',
    host: '',
    phone: '',
    email: '',
    published: false,
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

  public handleSubmit = (e, createEvent): any => {
    e.preventDefault();
    const { title, slug, featuredImage, content, published } = this.state;
    createEvent({
      variables: {
        title,
        slug,
        featuredImage,
        content,
        published,
      },
    }).then(data => {
      console.log(data);
      const event = data.data.createEvent;
      this.props.history.push(`/dashboard/events/${event.slug}`);
    });
  }

  public render() {
    console.log(this.state);
    return (
      <Mutation mutation={mutation}>
        {(createEvent, { loading, error }) => {
          return (
            <Card>
              <CardBody>
                <CardTitle>New Event</CardTitle>

                {loading && <Loading />}
                {/* Add a Snackbox here noticing the user that there was an error */}
                {error && <Error error={error} />}
                <form onSubmit={e => this.handleSubmit(e, createEvent)}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={this.state.title}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Slug</label>
                    <input
                      type="text"
                      name="slug"
                      placeholder="Slug"
                      value={slugify(this.state.title)}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Featured Image</label>
                    <input
                      type="text"
                      name="featuredImage"
                      placeholder="Featured Image"
                      value={this.state.featuredImage}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Published &nbsp;</label>
                    <input
                      type="checkbox"
                      name="published"
                      checked={this.state.published}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Start Date</label>
                    {/* <input
                      type="date"
                      name="startDate"
                      placeholder="Start Date"
                      value={this.state.startDate}
                    /> */}
                    <Datetime
                      timeFormat={false}
                      inputProps={{ placeholder: 'Start Date' }}
                      // value={this.state.startDate}
                      // onChange={this.handleInputChange}
                    />
                  </div>

                  <FormGroup>
                    {/* <input
                      type="date"
                      name="endDate"
                      placeholder="End Date"
                      value={this.state.endDate}
                      onChange={this.handleInputChange}
                      className="form-control"
                      min="01-01-2017"
                    /> */}
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
                    {/* <input
                      type="time"
                      name="startTime"
                      placeholder="Start Time"
                      value={this.state.startTime}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /> */}
                    <Datetime
                      dateFormat={false}
                      inputProps={{ placeholder: 'Start Time' }}
                      // value={}
                      defaultValue={this.state.startTime}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>End Time</Label>
                    {/* <input
                      type="time"
                      name="endTime"
                      placeholder="End Time"
                      value={this.state.endTime}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /> */}
                    <Datetime
                      dateFormat={false}
                      inputProps={{ placeholder: 'End Time' }}
                      // value={}
                      defaultValue={this.state.endTime}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={this.state.address}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Host</label>
                    <input
                      type="text"
                      name="host"
                      placeholder="Host"
                      value={this.state.host}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={this.state.phone}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Content</label>
                    <TextEditor />
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
