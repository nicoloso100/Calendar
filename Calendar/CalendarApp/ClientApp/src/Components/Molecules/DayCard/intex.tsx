import * as React from 'react';
import EventBadge from '../../Atoms/EventBadge';
import { DayCardCol, DayCardContainer, EventList } from './style';
import { format, isSameDay } from 'date-fns';

interface IDayCardProps {
  day: Date;
  sameMonth: boolean;
  events: IEvent[];
  onOpenEvent: (event: IEvent) => void;
  onOpenEvents: (date: Date, events: IEvent[]) => void;
  onCreateNewEvent: (date: Date) => void;
}

const DayCard: React.FC<IDayCardProps> = ({
  day,
  sameMonth,
  events,
  onOpenEvents,
  onOpenEvent,
  onCreateNewEvent,
}) => {
  return (
    <DayCardCol onClick={() => onOpenEvents(day, events)}>
      <DayCardContainer $sameMonth={sameMonth} $sameDay={isSameDay(day, new Date())}>
        <div>{format(day, 'd')}</div>
        <EventList>
          {events.length > 0 && (
            <EventBadge text="+ Create new event" onClick={() => onCreateNewEvent(day)} />
          )}
          {events.map((event) => (
            <EventBadge
              key={event.id}
              text={event.name}
              color={event.color?.code}
              onClick={() => onOpenEvent(event)}
            />
          ))}
        </EventList>
      </DayCardContainer>
    </DayCardCol>
  );
};

export default DayCard;
