import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  // IconButton,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
// import { Delete, ExpandMore } from '@material-ui/icons';
import * as React from 'react';
import ReactQuill from 'react-quill';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { quillFormats, quillModules } from '../../utils/quill';
import { SharedInput } from '../SharedInput';

const renderField = ({ input, label, type }) => (
  <SharedInput {...input} type={type} label={label} />
);

const renderContentField = ({ input, label, type }) => (
  <ReactQuill
    {...input}
    modules={quillModules}
    formats={quillFormats}
    type={type}
    label={label}
    style={{ height: 300, marginBottom: 64, marginTop: 16 }}
  />
);

// const handleRemovePart = async (index: number, fields: any) => {
//   // check if data exists in the form
//   // if it does, confirm to delete
//   // if it doesn't, just delete with no confirmation
//   console.log(fields.getAll());
//   // if (fields.getA)
//   const res = window.confirm('Are you sure?');
//   if (!res) {
//     return;
//   }
//   fields.remove(index);
// };

const renderMembers = ({ fields }) => (
  <div>
    {fields.map((part: any, index: number) => (
      <ExpansionPanel style={{ marginBottom: 16 }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Part {index + 1}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {/* <IconButton
            style={{ backgroundColor: '#CC0000' }}
            size="small"
            onClick={() => handleRemovePart(index, fields)}
          >
            <Delete fontSize="small" htmlColor="rgba(255, 255, 255, 0.9)" />
          </IconButton> */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
            }}
          >
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
              name={`${part}.video`}
              type="text"
              component={renderField}
              label="Video (YouTube)"
            />
            <Field
              name={`${part}.content`}
              type="text"
              component={renderContentField}
              label="Content"
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
    <div
      style={{
        marginTop: 16,
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <Button
        color="primary"
        variant="contained"
        onClick={() => fields.push({})}
      >
        Add New Part
      </Button>
    </div>
  </div>
);

const FieldArraysForm = (props: any) => {
  React.useEffect(() => {
    initializeForm();
  },              []);

  const initializeForm = () => {
    props.initialize({ parts: [{}] });
  };

  return <FieldArray name="parts" component={renderMembers} />;
};

export const PartsForm = reduxForm({
  form: 'partsForm',
})(FieldArraysForm);
