import Axios from 'axios';
import { Error } from 'components/Error';
import * as React from 'react';

import { API_URL } from '../../constants';

import { ColorSwatch } from 'components/ColorSwatch';

export class NewJewishPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    description: '',
    featuredImage: '',
    link: '',
    color: '#B56FEA',

    error: null,
  };

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleSubmit = async (e: any) => {
    e.preventDefault();
    const { title, slug, description, featuredImage, link, color } = this.state;

    try {
      await Axios.post(
        `${API_URL}/jewish`,
        {
          title,
          slug,
          description,
          featuredImage,
          link,
          orderNumber: Math.round(Math.random() * 1000),
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
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">New Jewish</h5>
          {this.state.error && (
            <Error error={JSON.stringify(this.state.error)} />
          )}

          <form onSubmit={e => this.handleSubmit(e)}>
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
                value={this.state.slug}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={this.state.description}
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
              <label>Link</label>
              <input
                type="text"
                name="link"
                placeholder="Link"
                value={this.state.link}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </div>

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

            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}
