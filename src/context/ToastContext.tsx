import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface IToastContext {
  isOpen: boolean;
  message: null | string;
  handleOpen: (incomingMessage: string) => void;
  handleClose: () => void;
  clear: () => void;
}

export const ToastContext = React.createContext<Partial<IToastContext>>({});
export const UserConsumer = ToastContext.Consumer;

export const ToastProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const handleClose = () => setIsOpen(false);

  const handleOpen = (incomingMessage: string) => {
    setIsOpen(true);
    setMessage(incomingMessage as any);
  };

  return (
    <ToastContext.Provider
      value={{
        isOpen,
        message,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
