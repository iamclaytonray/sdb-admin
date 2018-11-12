import Axios from 'axios';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { Part } from 'components/Part';
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

class SingleService extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: props.service.title,
      slug: props.service.slug,
      featuredImage: props.service.featuredImage,
      description: props.service.description,
      category: props.service.category,
      parts: props.service.parts,

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

  public onSelectChange = (e: any) => {
    let value: any = Array.from(
      e.target.selectedOptions as HTMLOptionsCollection,
      option => option.value,
    );
    console.log(value);
    // let values = Array.from(e.target.value, (option: any) => option.value);
    this.setState({ parts: value });
  }

  public handleUpdate = (e: any) => {
    e.preventDefault();
    const {
      title,
      featuredImage,
      description,
      slug,
      category,
      parts,
    } = this.state;
    Axios.put(
      `${API_URL}/services/${this.props.match.params.slug}`,
      {
        title,
        featuredImage,
        description,
        slug,
        category,
        parts,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
      .then(() => this.props.history.push('/dashboard/services'))
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
                value={this.state.slug}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Featured Image</Label>
              <Input
                type="text"
                name="featuredImage"
                value={this.state.featuredImage}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                value={this.state.category}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </FormGroup>
            {/*  */}
            <Part />
            {/*  */}
          </Form>
          <Button
            color="danger"
            onClick={() =>
              handleDelete(
                'services',
                this.props.match.params.slug,
                this.props.history,
              )
            }
          >
            Delete
          </Button>
          <Button color="primary" onClick={this.handleUpdate}>
            Update
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export class SingleServicePage extends React.Component<any, any> {
  public state = {
    loading: true,
    error: null,
    service: {},
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/services/${this.props.match.params.slug}`)
      .then(res => {
        this.setState({
          loading: false,
          service: res.data.data,
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
    console.log(this.state.service);
    return <SingleService service={this.state.service} {...this.props} />;
  }
}
