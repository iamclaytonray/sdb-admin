import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { TabsTable } from 'components/TabsTable';
import { AllTabsContainer } from 'containers/AllTabsContainer';
import * as React from 'react';

export class AllTabsPage extends React.Component {
  public state = {
    tabs: [],
    error: null,
    loading: true,
  };
  public render() {
    return (
      <AllTabsContainer>
        {({ loading, error, tabs }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }
          return (
            <TabsTable data={tabs} title="Menu Items" location="/dashboard/menu-items/new">
              New Menu Item
            </TabsTable>
          );
        }}
      </AllTabsContainer>
    );
  }
}
