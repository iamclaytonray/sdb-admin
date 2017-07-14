import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class EditPostForm extends Component {
  render() {

    const data = {
      title: this.props.title,
      content: this.props.content
    }

    const { handleSubmit } = this.props;
    
      return (
        <div>
          <form>

            <label>Title:</label>
            <input 
              name="title"
              component="input"
              type="text"
              value={data.title}
              className="form-control"
            />
            <p></p>

            <label>Content:</label>
            <textarea
              name="content"
              component="textarea"
              type="textarea"
              value={this.props.content}
              className="form-control"
            />
            <p></p>

            <button type="submit" className="btn btn-default">Submit</button>
            <p></p>
          </form>
        </div>
      );
  }
}


EditPostForm = reduxForm({
  form: 'newPost'
})(EditPostForm);

export default EditPostForm;