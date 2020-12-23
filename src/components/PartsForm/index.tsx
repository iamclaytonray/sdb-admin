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

import { MarkdownTextField } from '../MarkdownTextField';
import { SharedInput } from '../SharedInput';

interface Part {
  title: string;
  partNumber: string;
  video: string;
  content: string;
}
interface Props {
  parts: Part[];
  handleChange: any;
  setFieldValue: any;
}

const emptyPart = {
  title: '',
  partNumber: '',
  video: '',
  content: '',
};

export const PartsForm: React.FC<Props> = ({
  parts = [],
  handleChange,
  setFieldValue,
}) => {
  const handleAdd = () => {
    setFieldValue('parts', [...parts, emptyPart]);
  };

  const handleRemovePart = (index) => {
    setFieldValue(
      'parts',
      parts.filter((_node, i) => index !== i),
    );
  };

  return (
    <div>
      {parts.map((_part: any, index: number) => (
        <ExpansionPanel key={index} style={{ marginBottom: 16 }}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography>Part {index + 1}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  style={{ backgroundColor: '#CC0000' }}
                  size="small"
                  onClick={() => handleRemovePart(index)}
                >
                  <Delete
                    fontSize="small"
                    htmlColor="rgba(255, 255, 255, 0.9)"
                  />
                </IconButton>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                }}
              >
                <SharedInput
                  onChange={handleChange(`parts[${index}].title`)}
                  value={parts[index].title}
                  // name={`${part}.order`}
                  name="title"
                  type="text"
                  label="Title"
                />

                <SharedInput
                  onChange={handleChange(`parts[${index}].partNumber`)}
                  value={parts[index].partNumber}
                  // name={`${part}.order`}
                  name="partNumber"
                  type="text"
                  label="Part Number"
                />

                <SharedInput
                  onChange={handleChange(`parts[${index}].video`)}
                  value={parts[index].video}
                  // name={`${part}.order`}
                  name="video"
                  type="text"
                  label="Video (YouTube)"
                />

                <MarkdownTextField
                  // name={`${part}.content`}
                  // type="text"
                  // label="Content"
                  value={parts[index].content}
                  onChange={() => {}}
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
              onClick={handleAdd}
            >
              <Add htmlColor="#000" />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};
