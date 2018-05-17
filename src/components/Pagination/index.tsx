// import * as React from 'react';

export const Pagination = ({ fetchMore, data, name }) =>
  fetchMore({
    variables: {
      offset: data[name].length,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }
      return Object.assign({}, prev, {
        [name]: [...prev[name], ...fetchMoreResult[name]],
      });
    },
  });
