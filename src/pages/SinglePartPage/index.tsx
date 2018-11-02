import Axios from 'axios';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import * as React from 'react';
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { API_URL } from '../../constants';
import { handleDelete } from '../../utils/methods';

class SinglePart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: props.part.title,
      mediumLink: props.part.mediumLink,
      anchorLink: props.part.anchorLink,
      youtubeLink: props.part.youtubeLink,
      published: props.part.published,

      error: null,
    };
  }
  public handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = (e: any) => {
    e.preventDefault();
    const {
      title,
      mediumLink,
      anchorLink,
      youtubeLink,
      published,
    } = this.state;
    Axios.put(`${API_URL}/parts/${this.props.match.params.id}`, {
      title,
      mediumLink,
      anchorLink,
      youtubeLink,
      published,
    })
      .then(() => this.props.history.push('/dashboard/parts'))
      .catch(err => this.setState({ error: err }));
  }

  public render() {
    return (
      <Card>
        <CardBody>
          <Form>
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

            <Button
              color="danger"
              onClick={() =>
                handleDelete(
                  'parts',
                  this.props.match.params.id,
                  this.props.history,
                )
              }
            >
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

export class SinglePartPage extends React.Component<any, any> {
  public state = {
    loading: true,
    error: null,
    part: {},
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/parts/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          loading: false,
          part: res.data.data,
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
    return <SinglePart part={this.state.part} {...this.props} />;
  }
}
