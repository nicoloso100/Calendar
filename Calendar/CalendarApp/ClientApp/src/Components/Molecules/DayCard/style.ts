import { Card, Col } from 'reactstrap';
import styled from 'styled-components';

export const DayCardContainer = styled(Card)<{ $sameMonth: boolean; $sameDay: boolean }>`
  word-break: break-all;
  height: 100%;
  padding: 10px;
  transition-duration: 0.2s;
  color: ${(props) => (props.$sameMonth ? 'black' : '#D6D6D6')};
  cursor: ${(props) => (props.$sameMonth ? 'pointer' : 'auto')};
  user-select: none;
  border-right: ${(props) => (props.$sameDay ? '10px solid #007bff' : '1px solid #f1f1f1')};
  :hover {
    background-color: ${(props) => (props.$sameMonth ? '#f1f1f1' : 'white')};
    box-shadow: ${(props) => (props.$sameMonth ? '0px 0px 5px 2px rgba(0, 0, 0, 0.1)' : 'none')};
    border: 1px solid #f1f1f1;
  }
`;

export const DayCardCol = styled(Col)`
  padding: 0.2%;
`;

export const EventList = styled.div`
  flex: 1;
  margin-top: 10px;
`;
