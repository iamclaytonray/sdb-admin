import { Button, Card } from '@material-ui/core';
import Axios from 'axios';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';

import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import { SharedInput } from '../../components/SharedInput';
import { API_URL } from '../../constants';

export class EventDetailsPage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    content: '',

    loading: true,
    error: null,
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/events/${this.props.match.params.slug}`,
      );
      this.setState({
        loading: false,
        title: res.data.data.title,
        slug: res.data.data.slug,
        featuredImage: res.data.data.featuredImage,
        content: res.data.data.content || '',
      });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
  }

  public handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public handleUpdate = (e: any) => {
    e.preventDefault();
    const { title, slug, featuredImage, content } = this.state;
    try {
      Axios.put(
        `${API_URL}/events/${this.props.match.params.slug}`,
        {
          title,
          slug,
          featuredImage,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      this.props.history.push('/dashboard/events');
    } catch (error) {
      this.setState({ error: error.response.data.message });
      window.scroll(0, 0);
    }
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(
          `${API_URL}/events/${this.props.match.params.slug}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        );
        this.props.history.push(`/dashboard/events`);
      } catch (error) {
        this.setState({ error: error.response.data.message });
        window.scroll(0, 0);
      }
      return;
    }
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
      <Container fluid>
        <Row align="center" justify="center">
          <Col lg={8}>
            <Card style={{ padding: 24 }}>
              {this.state.error && (
                <Error error={JSON.stringify(this.state.error)} />
              )}
              <form>
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
                  name="featuredImage"
                  label="Featured Image (thumbnail)"
                  value={this.state.featuredImage}
                  onChange={this.handleInputChange}
                />

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
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
