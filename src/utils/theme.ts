import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        background: '#fff',
      },
    },
    MuiSelect: {
      root: {
        background: '#fff',
      },
    },
    MuiButton: {
      root: {
        padding: 12,
        textTransform: 'none',
      },
    },
  },
});
