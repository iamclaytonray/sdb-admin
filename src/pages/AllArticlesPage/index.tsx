// import { ArticlesTable } from 'components/ArticlesTable';
import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
import { API_URL } from '../../constants';

export const AllArticlesPage = () => {
  return (
    <Fetch url={`${API_URL}/articles`} method="GET" lifecycle="onMount">
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <Error error={error} />;
        }
        const articles = data.data;
        return (
          <SharedTable
            data={articles}
            title="Discoveries"
            location="/dashboard/articles/new"
            otherLocation="articles"
            children="New Discovery"
          />
        );
      }}
    </Fetch>
  );
};
