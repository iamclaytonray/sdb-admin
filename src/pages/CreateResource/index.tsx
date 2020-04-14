import { Button } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Error } from '../../components/Error';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';

export class CreateResourcePage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    description: '',
    featuredImage: '',
    link: '',
    color: '#B56FEA',
    content: '',

    error: null,
  };

  public handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      title,
      slug,
      description,
      featuredImage,
      link,
      color,
      content,
    } = this.state;

    try {
      await Axios.post(
        `${API_URL}/jewish`,
        {
          title,
          slug,
          description,
          featuredImage,
          link,
          content,
          color,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );

      this.props.history.push(`/dashboard/jewish`);
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scroll(0, 0);
    }
  }
  public render() {
    return (
      <div>
        {this.state.error && <Error error={JSON.stringify(this.state.error)} />}

        <form onSubmit={this.handleSubmit}>
          <SharedInput
            type="text"
            name="title"
            label="Title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <SharedInput
            type="text"
            name="slug"
            label="Slug"
            value={this.state.slug}
            onChange={this.handleInputChange}
          />
          <SharedInput
            type="text"
            name="description"
            label="Description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <SharedInput
            type="text"
            name="featuredImage"
            label="Featured Image (thumbnail)"
            value={this.state.featuredImage}
            onChange={this.handleInputChange}
          />
          <SharedInput
            type="text"
            name="link"
            label="External Link"
            value={this.state.link}
            onChange={this.handleInputChange}
          />

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

          <Button color="primary" variant="contained" type="submit">
            Create
          </Button>
        </form>
      </div>
    );
  }
}
