import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from '@material-ui/core';
import * as React from 'react';

interface IContext {
  open: () => void;
}

export const ModalContext = React.createContext<IContext>({} as IContext);

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

export const ModalProvider: React.FC = ({ children }) => {
  const [tab, setTab] = React.useState<number>(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
      }}
    >
      <Dialog fullWidth open={isOpen} onBackdropClick={close}>
        <Tabs value={tab} onChange={(_e, v) => setTab(v)}>
          <Tab label="Sermons" />
          <Tab label="Events" />
          <Tab label="Resources" />
        </Tabs>
        <DialogContent>
          <TabPanel value={tab} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={tab} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={tab} index={2}>
            Item Three
          </TabPanel>
        </DialogContent>
      </Dialog>
      {children}
    </ModalContext.Provider>
  );
};
