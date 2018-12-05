import Axios from 'axios';
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

export class SingleServicePage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    description: '',
    category: '',
    parts: [],

    loading: true,
    error: null,
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/services/${this.props.match.params.slug}`,
      );
      this.setState({
        loading: false,

        title: res.data.data.title,
        slug: res.data.data.slug,
        featuredImage: res.data.data.featuredImage,
        description: res.data.data.description,
        category: res.data.data.category,
        // parts: [],
      });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
  };

  public handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  public onSelectChange = (e: any) => {
    let value: any = Array.from(
      e.target.selectedOptions as HTMLOptionsCollection,
      option => option.value,
    );
    console.log(value);
    // let values = Array.from(e.target.value, (option: any) => option.value);
    this.setState({ parts: value });
  };

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
    try {
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
      );
      this.props.history.push('/dashboard/services');
    } catch (error) {
      this.setState({ error: error.response.data.message });
    }
  };

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(
          `${API_URL}/services/${this.props.match.params.slug}`,
        );
        this.props.history.push(`/dashboard/services`);
      } catch (error) {
        this.setState({ error: error.response.data.message });
      }
      return;
    }
    return alert('Item not deleted');
  };

  public render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return (
        <Card>
          <CardBody>{JSON.stringify(this.state.error)}</CardBody>
        </Card>
      );
    }
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
          <Button color="danger" onClick={this.handleDelete}>
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
