import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class EditPostForm extends Component {
  render() {
    const { handleSubmit } = this.props;
      return (
        <div>
          <form onSubmit={handleSubmit}>

            <Field 
              name="title"
              component="input"
              type="text"
              placeholder="Title"
              className="form-control"
            />
            <p></p>

            <Field
              name="content"
              component="textarea"
              type="text"
              placeholder="Content"
              className="form-control"
            />
            <p></p>

            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      );
  }
}


EditPostForm = reduxForm({
  form: 'newPost'
})(EditPostForm);

export default EditPostForm;