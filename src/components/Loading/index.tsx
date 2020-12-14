import { CircularProgress } from '@material-ui/core';
import * as React from 'react';

import './loading.scss';

export const Loading = () => (
  <div className="padding-50 centered">
    <CircularProgress  />
  </div>
);
