import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
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

import { ColorSwatch } from 'components/ColorSwatch';
import { Error } from 'components/Error';
import { PartsForm } from 'components/PartForm';

import { API_URL } from '../../constants';

export class NewService extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    description: '',
    featuredImage: '',
    color: '#B56FEA',
    parts: [],

    categories: [],

    error: null,
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    const res = await Axios.get(`${API_URL}/tabs/?pageType=Teachings`);
    this.setState({ categories: res.data.data });
  }

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
      color,
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
          color,
          parts: this.props.formState.partsForm.values.parts,
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
          <CardTitle>New Teaching</CardTitle>
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
                <React.Fragment>
                  Something went wrong trying to fetch the categories. If you
                  see this message, please refresh or try again later. Also, let
                  Clayton know.
                </React.Fragment>
              )}
            </select>

            <ColorSwatch color={this.state.color} />

            <label>Color</label>
            <select
              name="color"
              value={this.state.color}
              onChange={this.handleInputChange}
              className="form-control"
            >
              <option value="#B56FEA">Light Purple</option>
              <option value="#5A17C7">Purple</option>
              <option value="#031AF7">Dark Blue</option>
              <option value="#08D316">Green</option>
              <option value="#00ADFF">Light Blue</option>
              <option value="#FF4600">Orange</option>
            </select>

            <PartsForm />

            <Button type="submit" className="btn btn-primary">
              Create
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const NewServicePage = connect(mapStateToProps)(NewService);
