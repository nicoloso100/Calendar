import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { DeleteEvent, UpdateEvent } from '../../../Actions/API/eventsActions';
import { fetchEventsBegin } from '../../../Actions/Redux/eventsReduxActions';
import ConfirmationModal from '../ConfirmationModal';
import { RequiredMark, StyledModal, StyledModalBody } from './style';
import toast from 'react-hot-toast';
import { RootState } from '../../../Store/configureStore';
import { format, parse } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';

const defaultDeleteEventModal: IDeleteEventModal = {
  open: false,
  eventId: null,
};

interface IEditEventModalProps {
  modal: IEditEventModal;
  onClose: () => void;
}

const EditEventModal: React.FC<IEditEventModalProps> = ({ modal, onClose }) => {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.citiesReducer.cities);
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  const [openDeleteModal, setOpenDeleteModal] =
    React.useState<IDeleteEventModal>(defaultDeleteEventModal);

  const {
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<IUpdateEvent>();

  React.useEffect(() => {
    if (modal.event) {
      setValue('date', modal.event.date);
      setValue('name', modal.event.name);
      if (modal.event.description) {
        setValue('description', modal.event.description);
      }
      setValue('place', modal.event.place.id);
      if (modal.event.color) {
        setValue('color', modal.event.color.id);
      }
      setValue('startTime', format(new Date(modal.event.startTime), 'kk:mm'));
      setValue('endTime', format(new Date(modal.event.endTime), 'kk:mm'));
    }
  }, [modal.event, setValue]);

  const { color } = watch();

  const handleOnClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: ICreateEvent) => {
    if (modal.event) {
      if (data.color === '') {
        data.color = undefined;
      }
      if (data.startTime > data.endTime) {
        toast.error('The start time cannot be longer than the end time.');
      } else {
        data.startTime = parse(`${data.startTime}`, 'kk:mm', new Date(data.date));
        data.endTime = parse(`${data.endTime}`, 'kk:mm', new Date(data.date));
        try {
          const updated: IUpdateEvent = { ...data, id: modal.event.id };
          const result = await UpdateEvent(updated);
          dispatch(fetchEventsBegin());
          handleOnClose();
          toast.success(result);
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
  };

  const selectedColor = React.useMemo((): string => {
    if (modal.open) {
      let foundColor = colors.find((clr) => clr.id === color);
      return foundColor ? foundColor.code : 'white';
    }
    return 'white';
  }, [modal.open, colors, color]);

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

  const handleOpenDeleteModal = () => {
    if (modal.event) {
      setOpenDeleteModal({ open: true, eventId: modal.event.id });
    }
  };

  return (
    <div>
      <ConfirmationModal
        open={openDeleteModal.open}
        onAccept={() => handleDeleteEvent(openDeleteModal.eventId)}
        onClose={() => setOpenDeleteModal(defaultDeleteEventModal)}
      />
      <StyledModal isOpen={modal.open} toggle={handleOnClose}>
        <ModalHeader toggle={handleOnClose}>
          Edit event on {modal.event && format(new Date(modal.event.date), 'MM/dd/yyyy')}
        </ModalHeader>
        <StyledModalBody $color={selectedColor}>
          <Form>
            <FormGroup>
              <Label>
                <RequiredMark>*</RequiredMark> Name
              </Label>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    invalid={errors.name ? true : false}
                  />
                )}
                name="name"
                defaultValue=""
              />
              {errors.name && <FormFeedback>You must enter a name!</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    invalid={errors.description ? true : false}
                  />
                )}
                name="description"
                defaultValue=""
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <RequiredMark>*</RequiredMark> Location
              </Label>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="select"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    invalid={errors.place ? true : false}
                  >
                    <option value={''} defaultChecked>
                      -- Select a location --
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Input>
                )}
                name="place"
                defaultValue=""
              />
              {errors.place && <FormFeedback>You must enter a location!</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label>Color</Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    type="select"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    invalid={errors.color ? true : false}
                  >
                    <option value={''} defaultChecked>
                      -- Select a color --
                    </option>
                    {colors.map((color) => (
                      <option style={{ color: color.code }} key={color.id} value={color.id}>
                        {color.code}
                      </option>
                    ))}
                  </Input>
                )}
                name="color"
                defaultValue=""
              />
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <RequiredMark>*</RequiredMark> Start time
                    </Label>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          type="time"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value as string}
                          invalid={errors.startTime ? true : false}
                        />
                      )}
                      name="startTime"
                    />
                    {errors.startTime && <FormFeedback>You must enter a start time!</FormFeedback>}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <RequiredMark>*</RequiredMark> End time
                    </Label>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          type="time"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value as string}
                          invalid={errors.endTime ? true : false}
                        />
                      )}
                      name="endTime"
                    />
                    {errors.endTime && <FormFeedback>You must enter an end time!</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </StyledModalBody>
        <ModalFooter>
          <Button onClick={handleOpenDeleteModal} color="danger" size="sm">
            delete event
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary" size="sm">
            Edit event
          </Button>
        </ModalFooter>
      </StyledModal>
    </div>
  );
};

export default EditEventModal;
