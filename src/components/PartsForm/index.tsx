import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add, Delete, ExpandMore } from '@material-ui/icons';
import * as React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { MarkdownTextField } from '../MarkdownTextField';
import { SharedInput } from '../SharedInput';

const renderField = ({ input, label, type, style = [] }) => (
  <SharedInput {...input} type={type} label={label} style={...style} />
);

const renderContentField = ({ input }) => {
  console.log(input);
  return <MarkdownTextField {...input} />;
};

const handleRemovePart = async (index: number, fields: any) => {
  // check if data exists in the form
  // if it does, confirm to delete
  // if it doesn't, just delete with no confirmation
  const selectedField = fields.getAll()[index];
  if (Object.entries(selectedField).length < 1) {
    return fields.remove(index);
  }
  const res = window.confirm('Are you sure?');
  if (!res) {
    // if the user selected 'cancel', don't remove the field
    return;
  }
  fields.remove(index);
};

const renderMembers = ({ fields }) => (
  <div>
    {fields.map((part: any, index: number) => (
      <ExpansionPanel style={{ marginBottom: 16 }}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography>Part {index + 1}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                style={{ backgroundColor: '#CC0000' }}
                size="small"
                onClick={() => handleRemovePart(index, fields)}
              >
                <Delete fontSize="small" htmlColor="rgba(255, 255, 255, 0.9)" />
              </IconButton>
            </div>
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
                label="Title"
              />
              <Field
                name={`${part}.order`}
                type="text"
                component={renderField}
                label="Number"
                defaultValue={index + 1}
                style={{ display: 'none' }}
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
      <Tooltip title="Add New Part">
        <span>
          <IconButton
            style={{ backgroundColor: '#fff', boxShadow: '0 0 6px #ddd' }}
            onClick={() => fields.push({})}
          >
            <Add htmlColor="#000" />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  </div>
);

const FieldArraysForm = (props: any) => {
  React.useEffect(() => {
    initializeForm();
  },              []);

  React.useEffect(() => {
    initializeForm();
  },              [props.parts]);

  const initializeForm = () => {
    props.initialize({ parts: props.parts || [] });
  };

  return <FieldArray name="parts" component={renderMembers} />;
};

export const PartsForm = reduxForm({
  form: 'partsForm',
})(FieldArraysForm) as any;
