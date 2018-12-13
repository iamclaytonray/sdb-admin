import Axios from 'axios';
import { Error } from 'components/Error';
import * as React from 'react';
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

  public handleSubmit = async (e: any) => {
    e.preventDefault();
    const { label, slug, page } = this.state;
    try {
      await Axios.post(
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
      );
      this.props.history.push(`/dashboard/tabs`);
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scroll(0, 0);
    }
  }
  public render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">New Menu Item</h5>
          {this.state.error && <Error error={this.state.error} />}

          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group">
              <label>label</label>
              <input
                type="text"
                name="label"
                placeholder="label"
                value={this.state.label}
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
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Page</label>
              <input
                type="select"
                name="page"
                value={this.state.page}
                onChange={this.handleInputChange}
              >
                <option>Discoveries</option>
                <option>Teachings</option>
              </input>
            </div>

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}
