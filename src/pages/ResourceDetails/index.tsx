import { Button } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';

import { ColorSwatch } from '../../components/ColorSwatch';
import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import { API_URL } from '../../constants';

export class SingleResource extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    category: '',
    link: '',
    content: '',
    color: '#B56FEA',

    categories: [],

    loading: true,
    error: null,
  };

  public handleUpdate = async (e: any) => {
    e.preventDefault();
    // this.toast();
    const {
      title,
      slug,
      featuredImage,
      category,
      link,
      content,
      color,
    } = this.state;
    try {
      await Axios.put(
        `${API_URL}/articles/${this.props.match.params.slug}`,
        {
          title,
          slug,
          featuredImage,
          category,
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
      this.props.history.push('/dashboard/articles');
    } catch (error) {
      window.scroll(0, 0);
      this.setState({ error: error.response.data.message });
    }
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(
          `${API_URL}/articles/${this.props.match.params.slug}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        );
        this.props.history.push(`/dashboard/articles`);
      } catch (error) {
        // console.log(error);
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
          {this.state.error && <Error error={this.state.error} />}
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                value={this.state.slug}
                onChange={(e) => this.setState({ slug: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <input
                name="featuredImage"
                placeholder="Featured Image"
                type="text"
                value={this.state.featuredImage}
                onChange={(e) =>
                  this.setState({ featuredImage: e.target.value })
                }
                className="form-control"
              />
            </div>

            <label>Category</label>
            <select
              name="category"
              value={this.state.category}
              onChange={(e: any) => this.setState({ category: e.target.value })}
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

            <div className="form-group">
              <label>Link</label>
              <input
                name="link"
                type="text"
                value={this.state.link}
                onChange={(e) => this.setState({ link: e.target.value })}
                className="form-control"
              />
            </div>

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

            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleUpdate}
              >
                Update
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={this.handleDelete}
              >
                Delete All
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const ResourceDetailsPage = connect(mapStateToProps)(SingleResource);
