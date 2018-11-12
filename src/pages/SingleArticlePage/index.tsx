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
import { handleDelete } from '../../utils/methods';

export class SingleArticlePage extends React.Component<any, any> {
  public state = {
    loading: true,
    error: null,
    article: {},
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/articles/${this.props.match.params.slug}`)
      .then(res => {
        this.setState({
          loading: false,
          article: res.data.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }

    return <SingleArticle article={this.state.article} {...this.props} />;
  }
}

class SingleArticle extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: props.article.title,
      slug: props.article.slug,
      featuredImage: props.article.featuredImage,
      category: props.article.category,
      link: props.article.link,
      published: props.article.published,
      content: props.article.content,
      parts: props.article.parts,

      error: null,
    };
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
      published,
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
        published,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
      .then(() => this.props.history.push('/dashboard/articles'))
      .catch(err => {
        this.setState({ error: err.response.data.error });
        window.scroll(0, 0);
      });
  }

  public render() {
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

            <Button
              color="danger"
              onClick={() =>
                handleDelete(
                  'articles',
                  this.props.match.params.slug,
                  this.props.history,
                )
              }
            >
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
