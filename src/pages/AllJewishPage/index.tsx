import { Error } from 'components/Error';
import { JewishTable } from 'components/JewishTable';
import { Loading } from 'components/Loading';
import { AllJewishContainer } from 'containers/AllJewishContainer';
import * as React from 'react';

export class AllJewishPage extends React.Component<any, any> {
  public render() {
    return (
      <AllJewishContainer>
        {({ loading, error, jewish }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }
          return (
            <JewishTable
              data={jewish}
              title="Jewish"
              location="/dashboard/jewish/new"
            >
              New Jewish
            </JewishTable>
          );
        }}
      </AllJewishContainer>
    );
  }
}
