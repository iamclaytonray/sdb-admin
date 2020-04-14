import * as React from 'react';

import { Error } from '../Error';
import { Loading } from '../Loading';

// Do helmet stuff here
export const Page = ({ loading, error, children }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={JSON.stringify(error)} />;
  }

  return children;
};
