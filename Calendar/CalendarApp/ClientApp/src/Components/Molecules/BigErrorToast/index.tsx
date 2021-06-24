import * as React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

interface IBigErrorToastProps {
  message: string;
}

const BigErrorToast: React.FC<IBigErrorToastProps> = ({ message }) => {
  return (
    <div className="p-3 bg-danger my-2 rounded">
      <Toast>
        <ToastHeader>Error</ToastHeader>
        <ToastBody>{message}</ToastBody>
      </Toast>
    </div>
  );
};

export default BigErrorToast;
