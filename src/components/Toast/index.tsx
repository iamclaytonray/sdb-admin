import * as React from 'react';

interface Props {
  type: string;
  isOpen: boolean;
}

interface State {}

export class Toast extends React.Component<Props, State> {
  public render() {
    const { type } = this.props;
    if (!this.props.isOpen) {
      return null;
    }
    return (
      <div
        className="col-11 col-sm-4"
        style={{
          display: 'inline-block',
          margin: '0px auto',
          position: 'fixed',
          transition: 'all 0.5s ease-in-out 0s',
          zIndex: 1031,
          bottom: 20,
          right: 20,
        }}
      >
        <div
          className={`alert-with-icon animated fadeInDown alert alert-dismissible fade show ${
            type === 'success' ? 'alert-success' : 'alert-danger'
          }`}
          role="alert"
        >
          <button type="button" className="close" aria-label="Close">
            <i className="fa fa-close" />
          </button>
          <div>
            <i className="fa fa-bell" />
          </div>
          <span data-notify="message">
            <div>
              <div>{type === 'success' ? 'Success!' : 'Failure...'}</div>
            </div>
          </span>
        </div>
      </div>
    );
  }
}