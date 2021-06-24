import * as React from 'react';
import BigTitle from '../../Atoms/BigTitle';
import { CalendarHeaderCont } from './styles';
import { format } from 'date-fns';

const CalendarHeader: React.FC = () => {
  const dateFormat = 'MMMM yyyy';

  return (
    <CalendarHeaderCont>
      <BigTitle text={format(new Date(), dateFormat)} />
    </CalendarHeaderCont>
  );
};

export default CalendarHeader;
