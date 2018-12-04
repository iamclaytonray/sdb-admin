import Axios from 'axios';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import * as React from 'react';
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

export class SingleArticlePage extends React.Component<any, any> {
  public state = {
      title: '',
      slug: '',
      featuredImage: '',
      category: '',
      link: '',
      content: '',
      parts: [],

      loading: true,
      error: null,
    };

    public componentDidMount() {
      this.fetch();
    }
  
    public fetch = async() => {
      try {
          const res = await Axios.get(
            `${API_URL}/articles/${this.props.match.params.slug}`,
          );
      
          this.setState({
            loading: false,
            
            title: res.data.data.title,
            slug: res.data.data.slug,
            featuredImage: res.data.data.featuredImage,
            category: res.data.data.category,
            link: res.data.data.link,
            content: res.data.data.content,
            parts: res.data.data.parts,
          });
      } catch (error) {
        this.setState({ loading: false, error: error.response.data.message });
      }
    }

  public onSelectChange = (e: any) => {
    console.log(e.target.selectedOptions);
    let value: any = Array.from(
      e.target.selectedOptions as HTMLOptionsCollection,
      option => option.value,
    );
    this.setState({ parts: value });
  }

  public handleUpdate = () => {
    const {
      title,
      slug,
      featuredImage,
      category,
      link,
      content,
    } = this.state;
    Axios.put(
      `${API_URL}/articles/${this.props.match.params.slug}`,
      {
        title,
        slug,
        featuredImage,
        category,
        link,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
      .then(() => this.props.history.push('/dashboard/articles'))
      .catch(error => {
        console.log(error);
        this.setState({ error: error.response.data.message });
        window.scroll(0, 0);
      });
  }

  public handleDelete = async (e: any) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      try {
        await Axios.delete(
          `${API_URL}/articles/${this.props.match.params.slug}`,
        );
        this.props.history.push(`/dashboard/articles`);
      } catch (error) {
        console.log(error);
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

            <FormGroup>
              <Label>Content</Label>
              <textarea
                value={this.state.content}
                onChange={e => this.setState({ content: e.target.value })}
                className="form-control"
                rows={10}
              />
            </FormGroup>

            <Button color="danger" onClick={(e: any) => this.handleDelete(e)}>
              Delete
            </Button>
            <Button color="primary" onClick={this.handleUpdate}>
              Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
