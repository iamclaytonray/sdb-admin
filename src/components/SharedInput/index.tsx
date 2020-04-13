import { TextField, TextFieldProps } from '@material-ui/core';
import * as React from 'react';

export const SharedInput = (props: TextFieldProps) => {
  return <TextField {...props} margin="normal" variant="outlined" />;
};
