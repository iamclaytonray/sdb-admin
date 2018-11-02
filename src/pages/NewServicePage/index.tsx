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

export class NewServicePage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    description: '',
    featuredImage: '',
    parts: [] as any,
    partOptions: [] as any,

    error: null,
  };

  public componentDidMount() {
    Axios.get(`${API_URL}/parts`)
      .then(res => this.setState({ partOptions: res.data.data }))
      .catch(err => console.log(err));
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
      parts,
    } = this.state;
    Axios.post(`${API_URL}/services`, {
      title,
      slug,
      category,
      description,
      featuredImage,
      parts,
    })
      .then(() => {
        this.props.history.push(`/dashboard/services`);
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        window.scroll(0, 0);
      });
  }

  public onSelectChange = (e: any) => {
    let value: any = Array.from(
      e.target.selectedOptions as HTMLOptionsCollection,
      option => option.value,
    );
    this.setState({ parts: value });
  }

  public render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>New Service</CardTitle>
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

            <FormGroup>
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                placeholder="Category"
                value={this.state.category}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Parts</Label>
              <Input
                type="select"
                name="parts"
                multiple
                onChange={(e: any) => this.onSelectChange(e)}
              >
                {this.state.partOptions.map(p => {
                  return (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>

            <Button type="submit" className="btn btn-primary">
              Create
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
