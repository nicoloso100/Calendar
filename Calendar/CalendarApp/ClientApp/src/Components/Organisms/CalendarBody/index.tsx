import * as React from 'react';
import {
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import DayCard from '../../Molecules/DayCard/intex';
import { CalendarBodyCont, CalendarWeekRow } from './styles';
import { RootState } from '../../../Store/configureStore';
import { useSelector } from 'react-redux';
import ViewEventsModal from '../../Molecules/ViewEventsModal';
import CreateEventModal from '../../Molecules/CreateEventModal';
import EditEventModal from '../../Molecules/EditEventModal';

const monthStart = startOfMonth(new Date());
const monthEnd = endOfMonth(monthStart);
const startDate = startOfWeek(monthStart);
const endDate = endOfWeek(monthEnd);

const defaultEventsModal: IEventsModal = {
  open: false,
  date: null,
  events: [],
};

const defaultCreateEventModal: ICreateEventModal = {
  open: false,
  date: null,
};

const defaultEditEventModal: IEditEventModal = {
  open: false,
  event: null,
};

const CalendarBody: React.FC = () => {
  const allEvents = useSelector((state: RootState) => state.eventsReducer.events);
  const [eventsModal, setEventsModal] = React.useState<IEventsModal>(defaultEventsModal);
  const [createEventModal, setCreateEventModal] =
    React.useState<ICreateEventModal>(defaultCreateEventModal);
  const [editEventModal, setEditEventModal] =
    React.useState<IEditEventModal>(defaultEditEventModal);

  const onOpenEventsModal = (date: Date, eventsList: IEvent[]) => {
    setEventsModal({
      open: true,
      date: date,
      events: eventsList,
    });
  };

  const onOpenCreateEventModal = (date: Date) => {
    setCreateEventModal({
      open: true,
      date: date,
    });
  };

  const onOpenEditEventModal = (event: IEvent) => {
    setEditEventModal({
      open: true,
      event: event,
    });
  };

  const GetDayEvents = React.useCallback(
    (day: Date): IEvent[] => {
      let events: IEvent[] = [];
      if (allEvents.length > 0) {
        events = allEvents.filter((event) => isSameDay(day, new Date(event.date)));
      }
      return events;
    },
    [allEvents]
  );

  const rows = React.useMemo(() => {
    let days = [];
    let day = startDate;
    let preparedRows = [];
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <DayCard
            key={day.toLocaleDateString()}
            day={day}
            sameMonth={isSameMonth(day, monthStart)}
            events={GetDayEvents(day)}
            onOpenEvent={onOpenEditEventModal}
            onOpenEvents={onOpenEventsModal}
            onCreateNewEvent={onOpenCreateEventModal}
          />
        );
        day = addDays(day, 1);
      }
      preparedRows.push(<CalendarWeekRow key={day.toLocaleDateString()}>{days}</CalendarWeekRow>);
      days = [];
    }
    return preparedRows;
  }, [GetDayEvents]);

  return (
    <React.Fragment>
      <ViewEventsModal
        modal={eventsModal}
        onClose={() => setEventsModal(defaultEventsModal)}
        onOpenEvent={onOpenEditEventModal}
        onCreateNewEvent={onOpenCreateEventModal}
      />
      <CreateEventModal
        modal={createEventModal}
        onClose={() => setCreateEventModal(defaultCreateEventModal)}
      />
      <EditEventModal
        modal={editEventModal}
        onClose={() => setEditEventModal(defaultEditEventModal)}
      />
      <CalendarBodyCont>{rows}</CalendarBodyCont>
    </React.Fragment>
  );
};

export default CalendarBody;
