import * as React from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { CalendarSubHeaderCont } from './styles';
import { Col } from 'reactstrap';

const CalendarSubHeader: React.FC = () => {
  const dateFormat = 'eeee';
  let startDate = startOfWeek(new Date());

  return (
    <CalendarSubHeaderCont>
      {[...Array(7)].map((_element, index) => (
        <Col key={index}>{format(addDays(startDate, index), dateFormat)}</Col>
      ))}
    </CalendarSubHeaderCont>
  );
};

export default CalendarSubHeader;
