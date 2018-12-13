import Axios from 'axios';
import { Loading } from 'components/Loading';
import * as React from 'react';
import { API_URL } from '../../constants';

export class SingleTabPage extends React.Component<any, any> {
  public state = {
    label: '',
    slug: '',
    page: '',

    loading: true,
    error: null,
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/tabs/${this.props.match.params.slug}`,
      );
      this.setState({
        loading: false,
        label: res.data.data.label,
        slug: res.data.data.slug,
        page: res.data.data.page,
      });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false, error: error.response.data.message });
    }
  }

  public handleInputChange = (event: any) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = async (e: any) => {
    e.preventDefault();
    const { label, slug, page } = this.state;
    try {
      await Axios.put(
        `${API_URL}/tabs/${this.props.match.params.slug}`,
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

      this.props.history.push('/dashboard/tabs');
    } catch (error) {
      this.setState({ error: error.response.data.message });
    }
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(`${API_URL}/tabs/${this.props.match.params.slug}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        this.props.history.push(`/dashboard/tabs`);
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
        <div className="card">
          <div className="card-body">{JSON.stringify(this.state.error)}</div>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>label</label>
              <input
                type="text"
                name="label"
                value={this.state.label}
                className="form-control"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                value={this.state.slug}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Page</label>
              <select
                name="page"
                value={this.state.page}
                onChange={this.handleInputChange}
                className="form-control"
              >
                <option>Discoveries</option>
                <option>Teachings</option>
              </select>
            </div>
          </form>
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button className="btn btn-primary" onClick={this.handleUpdate}>
              Update
            </button>
            <button className="btn btn-danger" onClick={this.handleDelete}>
              Delete All
            </button>
          </div>
        </div>
      </div>
    );
  }
}
