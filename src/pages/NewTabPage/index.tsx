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

export class NewTabPage extends React.Component<any, any> {
  public state = {
    label: '',
    slug: '',
    page: 'Discoveries',
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
    const { label, slug, page } = this.state;
    Axios.post(
      `${API_URL}/tabs`,
      {
        label,
        slug,
        page,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
      .then(() => {
        this.props.history.push(`/dashboard/tabs`);
      })
      .catch(error => {
        this.setState({ error: error.response.data.message });
        window.scroll(0, 0);
      });
  }
  public render() {
    console.log(this.state);
    return (
      <Card>
        <CardBody>
          <CardTitle>New Menu Item</CardTitle>
          {this.state.error && <Error error={this.state.error} />}

          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
              <Label>Label</Label>
              <Input
                type="text"
                name="label"
                placeholder="Label"
                value={this.state.label}
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
                onChange={this.handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Page</Label>
              <Input
                type="select"
                name="page"
                value={this.state.page}
                onChange={this.handleInputChange}
              >
                <option>Discoveries</option>
                <option>Teachings</option>
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
