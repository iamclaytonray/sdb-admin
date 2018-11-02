import Axios from 'axios';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import * as React from 'react';
import { Card, CardBody, CardTitle, FormGroup, Input, Label } from 'reactstrap';
import { API_URL } from '../../constants';

export class NewArticlePage extends React.Component<any, any> {
  public state = {
    title: '',
    slug: '',
    category: '',
    content: '',
    link: '',
    featuredImage: '',
    parts: [] as any,
    partOptions: [] as any,
    published: 'draft',

    error: null,
    loading: true,
  };

  public componentDidMount() {
    Axios.get(`${API_URL}/parts`)
      .then(res => this.setState({ loading: false, partOptions: res.data.data }))
      .catch(err => this.setState({ loading: false, error: err }));
  }

  public handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  public onSelectChange = (e: any) => {
    let value: any = Array.from(
      e.target.selectedOptions as HTMLOptionsCollection,
      option => option.value,
    );
    // let values = Array.from(e.target.value, (option: any) => option.value);
    this.setState({ parts: value });
  }

  public handleSubmit = (e): any => {
    e.preventDefault();
    const {
      title,
      slug,
      featuredImage,
      category,
      link,
      published,
      content,
      parts,
    } = this.state;
    Axios.post(`${API_URL}/articles`, {
      title,
      slug,
      featuredImage,
      category,
      link,
      published,
      content,
      parts,
    })
      .then(res => {
        this.props.history.push(`/dashboard/articles`);
      })
      .catch(err => {
        this.setState({
          error: err.response.data.error,
        });
      });
  }

  public render() {
    if (this.state.loading) {
      return <Loading />;
    }
    console.log(this.state);
    return (
      <Card>
        <CardBody>
          {this.state.error && <Error error={this.state.error} />}
          <CardTitle>New Discovery</CardTitle>
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
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={this.state.category}
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

            <FormGroup>
              <Label>Published</Label>
              <Input
                name="published"
                type="select"
                onChange={this.handleInputChange}
                className="form-control"
              >
                <option>Published</option>
                <option>Draft</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Parts</Label>
              <Input
                type="select"
                name="parts"
                multiple
                onChange={(e: any) => this.onSelectChange(e)}
              >
                {this.state.partOptions.map(p => {
                  return (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>

            <div className="form-group">
              <label>Content</label>
              <textarea
                name="content"
                value={this.state.content}
                placeholder="Content"
                className="form-control"
                rows={10}
                onChange={this.handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </CardBody>
      </Card>
    );
  }
}
