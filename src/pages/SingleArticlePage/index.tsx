import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { API_URL } from '../../constants';

import { ColorSwatch } from 'components/ColorSwatch';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { PartsForm } from 'components/PartForm';
import { Toast } from 'components/Toast';

export class SingleArticle extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    featuredImage: '',
    category: '',
    link: '',
    content: '',
    color: '',
    parts: [],

    loading: true,
    error: null,

    isToastOpen: false,
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch = async () => {
    try {
      const res = await Axios.get(
        `${API_URL}/articles/${this.props.match.params.slug}`,
      );

      console.log(res.data);

      this.setState({
        loading: false,

        title: res.data.data.title,
        slug: res.data.data.slug,
        featuredImage: res.data.data.featuredImage,
        category: res.data.data.category,
        link: res.data.data.link,
        content: res.data.data.content,
        parts: res.data.data.parts,
        color: res.data.data.color,
      });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
  }

  public handleUpdate = async () => {
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
          parts: this.props.formState.partsForm.values.parts,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      this.props.history.push('/dashboard/articles');
    } catch (error) {
      // console.log(error);
      this.setState({ error: error.response.data.message });
      window.scroll(0, 0);
    }
  }

  public toast = async () => {
    this.setState({ isToastOpen: true });
    setTimeout(() => {
      this.setState({ isToastOpen: false });
    },         2000);
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    // this.toast();
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
        <Card>
          <CardBody>{JSON.stringify(this.state.error)}</CardBody>
        </Card>
      );
    }
    return (
      <Card>
        <Toast isOpen={this.state.isToastOpen} type="danger" />
        <CardBody>
          {this.state.error && <Error error={this.state.error} />}
          <Form>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Slug</Label>
              <Input
                type="text"
                value={this.state.slug}
                onChange={e => this.setState({ slug: e.target.value })}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Featured Image</Label>
              <br />
              <img
                src={this.state.featuredImage}
                style={{ height: 100, width: 'auto' }}
              />
              <p />
              <Input
                name="featuredImage"
                placeholder="Featured Image"
                type="text"
                value={this.state.featuredImage}
                onChange={e => this.setState({ featuredImage: e.target.value })}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <Input
                name="category"
                type="text"
                value={this.state.category}
                onChange={e => this.setState({ category: e.target.value })}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <Label>Link</Label>
              <Input
                name="link"
                type="text"
                value={this.state.link}
                onChange={e => this.setState({ link: e.target.value })}
                className="form-control"
              />
            </FormGroup>

            <ColorSwatch color={this.state.color} />

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

            <FormGroup>
              <Label>Content</Label>
              <textarea
                value={this.state.content}
                onChange={e => this.setState({ content: e.target.value })}
                className="form-control"
                rows={10}
              />
            </FormGroup>

            <PartsForm parts={this.state.parts} />

            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button color="primary" onClick={this.handleUpdate}>
                Update
              </Button>
              <Button color="danger" onClick={this.handleDelete}>
                Delete All
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => ({
  formState: state.form,
});

export const SingleArticlePage = connect(mapStateToProps)(SingleArticle);
