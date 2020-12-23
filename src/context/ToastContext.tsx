import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import * as React from 'react';

interface State {
  isOpen: boolean;
  message: string;
  variant?: 'error' | 'info' | 'success';
  position?: 'bottom' | 'top';
  autoHideDuration: number;
}

interface IContext {
  toast: any;
  open: (args: Pick<State, 'message' | 'position' | 'variant'>) => void;
}

export const ToastContext = React.createContext<IContext>({} as IContext);

const initialState: State = {
  isOpen: false,
  message: '',
  variant: 'info',
  position: 'bottom',
  autoHideDuration: 2500,
};

export const ToastProvider: React.FC = ({ children }) => {
  const [toast, setToast] = React.useState<State>(initialState);

  React.useEffect(() => {
    setTimeout(() => {
      setToast(initialState);
    }, toast.autoHideDuration);
  }, [toast.isOpen === true]);

  const open = ({ message, variant, position }) => {
    if (!message) {
      return;
    }

    setToast({
      ...toast,
      isOpen: true,
      message,
      variant: variant || 'info',
      position: position || 'bottom',
    });
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        open,
      }}
    >
      {toast.isOpen && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={toast.isOpen}
          autoHideDuration={3000}
          message={toast.message}
        >
          <Alert severity={toast.variant}>{toast.message}</Alert>
        </Snackbar>
      )}
      {children}
    </ToastContext.Provider>
  );
};
