import * as React from 'react';
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
import { RequiredMark, StyledModal, StyledModalBody } from './style';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/configureStore';
import { format, parse } from 'date-fns';
import toast from 'react-hot-toast';
import { CreateEvent } from '../../../Actions/API/eventsActions';
import { fetchEventsBegin } from '../../../Actions/Redux/eventsReduxActions';

interface ICreateEventModalProps {
  modal: ICreateEventModal;
  onClose: () => void;
}

const CreateEventModal: React.FC<ICreateEventModalProps> = ({ modal, onClose }) => {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.citiesReducer.cities);
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ICreateEvent>();

  React.useEffect(() => {
    if (modal.open && modal.date) {
      setValue('date', modal.date);
    }
  }, [modal.date, modal.open, setValue]);

  const { color } = watch();

  const handleOnClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: ICreateEvent) => {
    if (data.color === '') {
      data.color = undefined;
    }
    if (data.startTime > data.endTime) {
      toast.error('The start time cannot be longer than the end time.');
    } else {
      data.startTime = parse(`${data.startTime}`, 'kk:mm', data.date);
      data.endTime = parse(`${data.endTime}`, 'kk:mm', data.date);
      try {
        const result = await CreateEvent(data);
        dispatch(fetchEventsBegin());
        handleOnClose();
        toast.success(result);
      } catch (error) {
        toast.error(error.message);
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

  return (
    <div>
      <StyledModal isOpen={modal.open} toggle={handleOnClose}>
        <React.Fragment>
          <ModalHeader toggle={handleOnClose}>
            Create new event on {modal.date && format(modal.date, 'MM/dd/yyyy')}
          </ModalHeader>
          <StyledModalBody $color={selectedColor}>
            <Form>
              <FormGroup>
                <Label>
                  <RequiredMark>*</RequiredMark> Name
                </Label>
                <Input
                  {...register('name', { required: true })}
                  invalid={errors.name ? true : false}
                />
                {errors.name && <FormFeedback>You must enter a name!</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input {...register('description')} />
              </FormGroup>
              <FormGroup>
                <Label>
                  <RequiredMark>*</RequiredMark> Location
                </Label>
                <Input
                  type="select"
                  {...register('place', { required: true })}
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
                {errors.place && <FormFeedback>You must enter a location!</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label>Color</Label>
                <Input type="select" {...register('color')}>
                  <option value={''} defaultChecked>
                    -- Select a color --
                  </option>
                  {colors.map((color) => (
                    <option style={{ color: color.code }} key={color.id} value={color.id}>
                      {color.code}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        <RequiredMark>*</RequiredMark> Start time
                      </Label>
                      <Input
                        type="time"
                        {...register('startTime', { required: true })}
                        invalid={errors.startTime ? true : false}
                      />
                      {errors.startTime && (
                        <FormFeedback>You must enter a start time!</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        <RequiredMark>*</RequiredMark> End time
                      </Label>
                      <Input
                        type="time"
                        {...register('endTime', { required: true })}
                        invalid={errors.endTime ? true : false}
                      />
                      {errors.endTime && <FormFeedback>You must enter an end time!</FormFeedback>}
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </StyledModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit(onSubmit)} color="primary">
              Create Event
            </Button>
          </ModalFooter>
        </React.Fragment>
      </StyledModal>
    </div>
  );
};

export default CreateEventModal;
