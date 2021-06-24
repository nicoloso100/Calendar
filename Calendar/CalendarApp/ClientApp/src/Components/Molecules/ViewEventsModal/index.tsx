import * as React from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
  ActionButtonsCont,
  EventDetails,
  EventDetailsDates,
  EventDetailsInfo,
  EventsContainer,
  StyledModal,
} from './style';
import { format } from 'date-fns';
import { DeleteEvent } from '../../../Actions/API/eventsActions';
import toast from 'react-hot-toast';
import ConfirmationModal from '../ConfirmationModal';
import { useDispatch } from 'react-redux';
import { fetchEventsBegin } from '../../../Actions/Redux/eventsReduxActions';

const defaultDeleteEventModal: IDeleteEventModal = {
  open: false,
  eventId: null,
};

interface IViewEventsModalProps {
  modal: IEventsModal;
  onClose: () => void;
  onOpenEvent: (event: IEvent) => void;
  onCreateNewEvent: (date: Date) => void;
}

const ViewEventsModal: React.FC<IViewEventsModalProps> = ({
  modal,
  onClose,
  onOpenEvent,
  onCreateNewEvent,
}) => {
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] =
    React.useState<IDeleteEventModal>(defaultDeleteEventModal);

  const handleCreateNewEvent = () => {
    if (modal.date) {
      onCreateNewEvent(modal.date);
      onClose();
    }
  };

  const handleEditNewEvent = (eventInfo: IEvent) => {
    onOpenEvent(eventInfo);
    onClose();
  };

  const handleDeleteEvent = async (eventId: string | null) => {
    if (eventId) {
      try {
        const message = await DeleteEvent(eventId);
        dispatch(fetchEventsBegin());
        onClose();
        toast.success(message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setOpenDeleteModal(defaultDeleteEventModal);
      }
    }
  };

  return (
    <div>
      <ConfirmationModal
        open={openDeleteModal.open}
        onAccept={() => handleDeleteEvent(openDeleteModal.eventId)}
        onClose={() => setOpenDeleteModal(defaultDeleteEventModal)}
      />
      <StyledModal isOpen={modal.open} toggle={onClose}>
        <ModalHeader toggle={onClose}>
          Events of {modal.date && format(modal.date, 'MM/dd/yyyy')}
        </ModalHeader>
        <ModalBody>
          {modal.events.length > 0 ? (
            <EventsContainer>
              {modal.events.map((eventInfo) => (
                <EventDetails key={eventInfo.id} $customColor={eventInfo.color?.code}>
                  <EventDetailsInfo>
                    <h4>{eventInfo.name}</h4>
                    {eventInfo.description && <h5>{eventInfo.description}</h5>}
                    <h6>{eventInfo.place.name}</h6>
                    <ActionButtonsCont>
                      <Button
                        onClick={() => handleEditNewEvent(eventInfo)}
                        outline
                        color="primary"
                        size="sm"
                      >
                        Edit event
                      </Button>
                      <Button
                        onClick={() => setOpenDeleteModal({ open: true, eventId: eventInfo.id })}
                        outline
                        color="danger"
                        size="sm"
                      >
                        delete event
                      </Button>
                    </ActionButtonsCont>
                  </EventDetailsInfo>
                  <EventDetailsDates>
                    <div>
                      <span>Starts at</span>
                      <h5>{format(new Date(eventInfo.startTime), 'kk:mm')}</h5>
                    </div>
                    <div>
                      <span>Ends at</span>
                      <h5>{format(new Date(eventInfo.endTime), 'kk:mm')}</h5>
                    </div>
                  </EventDetailsDates>
                </EventDetails>
              ))}
            </EventsContainer>
          ) : (
            <div>
              <h5>There are no events created for this day</h5>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCreateNewEvent} color="primary">
            + Create one event
          </Button>
        </ModalFooter>
      </StyledModal>
    </div>
  );
};

export default ViewEventsModal;
