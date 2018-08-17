import Axios from 'axios';
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

export class NewTabPage extends React.Component<any, any> {
  public state = {
    label: '',
    slug: '',
    page: 'Discoveries',
    published: false,

    error: null,
  };

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
      label,
      slug,
      page,
      published,
    } = this.state;
    Axios.post(`${API_URL}/tabs`, {
      label,
      slug,
      page,
      published,
    })
      .then(() => {
        this.props.history.push(`/dashboard/menu-items`);
      })
      .catch(err => this.setState({ error: err }));
  }
  public render() {
    console.log(this.state);
    return (
      <Card>
        <CardBody>
          <CardTitle>New Menu Item</CardTitle>

          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
              <Label>Label</Label>
              <Input
                type="text"
                name="label"
                placeholder="Label"
                value={this.state.label}
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

            {/* <FormGroup>
              <Label>Page</Label>
              <Input
                type="text"
                name="page"
                placeholder="Page"
                value={this.state.page}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </FormGroup> */}

            <FormGroup>
              <Label>Page</Label>
              <Input
                type="select"
                name="page"
                value={this.state.page}
                onChange={this.handleInputChange}
                className="form-control"
              >
                <option>Discoveries</option>
                <option>Teachings</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Published?</Label>
              <Input
                type="checkbox"
                name="published"
                checked={this.state.published}
                className="form-check-input"
                onChange={this.handleInputChange}
              />
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
