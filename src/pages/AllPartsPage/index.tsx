import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { PartsTable } from 'components/PartsTable';
import { AllPartsContainer } from 'containers/AllPartsContainer';
import * as React from 'react';

export class AllPartsPage extends React.Component<any, any> {
  public state = {
    parts: [],
    error: null,
    loading: true,
  };
  public render() {
    return (
      <AllPartsContainer>
        {({ loading, error, parts }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }
          return (
            <PartsTable
              data={parts}
              title="Parts"
              location="/dashboard/parts/new"
            >
              New Part
            </PartsTable>
          );
        }}
      </AllPartsContainer>
    );
  }
}
