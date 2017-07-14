import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class NewPostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title
    }
  }
  render() {
    const { handleSubmit } = this.props;
      return (
        <div>
          <form onSubmit={handleSubmit}>

            <Field 
              name="title"
              component="input"
              type="text"
              placeholder={this.state.title}
              className="form-control"
            />

            <Field
              name="content"
              component="textarea"
              type="text"
              placeholder="Content"
              className="form-control"
            />
            <p></p>

            <button type="submit">Submit</button>
          </form>
        </div>
      );
  }
}


NewPostForm = reduxForm({
  form: 'newPost'
})(NewPostForm);

export default NewPostForm;