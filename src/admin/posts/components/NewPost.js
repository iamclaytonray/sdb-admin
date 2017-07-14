import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import NewPostForm from '../containers/NewPostForm';

class NewPost extends Component {
  constructor(props) {
    super(props);
  }

  submit = (values) => {
    console.log(values);
  }
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>New Post</h1>
        <NewPostForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default NewPost;
