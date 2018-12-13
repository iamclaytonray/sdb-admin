import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
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

import { ColorSwatch } from 'components/ColorSwatch';
import { Loading } from 'components/Loading';
import { PartsForm } from 'components/PartForm';

export class SingleService extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    description: '',
    category: '',
    color: '#5A17C7',
    parts: [],

    categories: [],

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

      const categoryRes = await Axios.get(
        `${API_URL}/tabs/?pageType=Teachings`,
      );

      this.setState({
        loading: false,

        title: res.data.data.title,
        slug: res.data.data.slug,
        featuredImage: res.data.data.featuredImage,
        description: res.data.data.description,
        category: res.data.data.category,
        color: res.data.data.color,
        parts: res.data.data.parts,

        categories: categoryRes.data.data,
      });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
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
      featuredImage,
      description,
      slug,
      category,
      color,
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
          color,
          parts: this.props.formState.partsForm.values.parts,
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
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(
          `${API_URL}/services/${this.props.match.params.slug}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        );
        this.props.history.push(`/dashboard/services`);
      } catch (error) {
        this.setState({ error: error.response.data.message });
      }
      return;
    }
    return alert('Item not deleted');
  }

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

            <label>Category</label>
            <select
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
              className="form-control"
            >
              {this.state.categories.length > 0 ? (
                this.state.categories.map((category: any, i: number) => (
                  <option key={i} value={category.slug}>
                    {category.label}
                  </option>
                ))
              ) : (
                <div>
                  Something went wrong trying to fetch the categories. If you
                  see this message, please refresh or try again later. Also, let
                  Clayton know.
                </div>
              )}
            </select>

            <ColorSwatch color={this.state.color} />

            <label>Color</label>
            <select
              name="color"
              value={this.state.color}
              onChange={(e: any) => this.setState({ color: e.target.value })}
              className="form-control"
            >
              <option value="#B56FEA">Light Purple</option>
              <option value="#5A17C7">Purple</option>
              <option value="#031AF7">Dark Blue</option>
              <option value="#08D316">Green</option>
              <option value="#00ADFF">Light Blue</option>
              <option value="#FF4600">Orange</option>
            </select>
          </Form>
          {/*  */}
          <PartsForm parts={this.state.parts} />
          {/*  */}

          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button color="primary" onClick={this.handleUpdate}>
              Update
            </Button>
            <Button color="danger" onClick={this.handleDelete}>
              Delete All
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const SingleServicePage = connect(mapStateToProps)(SingleService);
