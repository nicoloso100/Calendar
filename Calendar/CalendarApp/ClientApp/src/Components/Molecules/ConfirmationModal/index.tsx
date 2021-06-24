import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface IConfirmationModalProps {
  open: boolean;
  onAccept: () => void;
  onClose: () => void;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({ open, onAccept, onClose }) => {
  return (
    <div>
      <Modal isOpen={open} toggle={onClose}>
        <ModalHeader toggle={onClose}>Are you sure?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the event? This action cannot be reversed
        </ModalBody>
        <ModalFooter>
          <Button onClick={onAccept} color="danger" size="sm">
            Yes, delete
          </Button>
          <Button onClick={onClose} color="secondary" size="sm">
            NO
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
