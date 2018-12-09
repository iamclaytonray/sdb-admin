import * as React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      {...input}
      type={type}
      placeholder={label}
      className="form-control"
    />
    {touched && error && <span>{error}</span>}
  </div>
);

const handleRemovePart = async (index: number, fields: any) => {
  const res = await window.confirm('Are you sure?');
  if (!res) {
    return;
  }
  fields.remove(index);
};

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <li>{(touched || submitFailed) && error && <span>{error}</span>}</li>
    {fields.map((part, index) => (
      <li key={index}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h4>Part #{index + 1}</h4>

          <i
            className="fa fa-trash fa-lg"
            style={{ color: '#ff3636' }}
            onClick={() => handleRemovePart(index, fields)}
          />
        </div>
        <Field
          name={`${part}.title`}
          type="text"
          component={renderField}
          label="Part Title"
        />
        <Field
          name={`${part}.partNumber`}
          type="text"
          component={renderField}
          label="Part Number"
          defaultValue={index + 1}
        />
        <Field
          name={`${part}.youtubeLink`}
          type="text"
          component={renderField}
          label="(Video) Youtube Link"
        />
        <Field
          name={`${part}.mediumLink`}
          type="text"
          component={renderField}
          label="(Text) Medium Link"
        />
      </li>
    ))}
    <button
      className="btn btn-default"
      type="button"
      onClick={() => fields.push({})}
    >
      Add Part
    </button>
  </ul>
);

class FieldArraysForm extends React.Component<any, any> {
  public componentDidMount() {
    this.initializeForm();
  }

  public componentDidUpdate(prevProps: any) {
    if (prevProps.parts !== this.props.parts) {
      this.props.initialize({ parts: this.props.parts });
    }
  }

  public initializeForm = () => {
    this.props.initialize({ parts: this.props.parts });
  }

  public render() {
    console.log(this.props);
    // tslint:disable-next-line
    // const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <FieldArray name="parts" component={renderMembers} />
        <div>
          {/* <button className="btn btn-primary" type="submit" disabled={submitting}>
          Submit
        </button>
        <button
          className="btn btn-primary"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </button> */}
        </div>
      </div>
    );
  }
}

export const PartsForm = reduxForm({
  form: 'partsForm',
})(FieldArraysForm);
