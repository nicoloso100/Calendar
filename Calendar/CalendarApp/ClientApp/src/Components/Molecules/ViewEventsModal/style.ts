import { Modal } from 'reactstrap';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  width: 70%;
  max-width: 1200px;
`;

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EventDetails = styled.div<{ $customColor?: string }>`
  background-color: ${(props) => (props.$customColor ? props.$customColor : '#9BCDFF')};
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  display: flex;
`;

export const EventDetailsInfo = styled.div`
  word-break: break-all;
  padding-right: 20px;
  flex: 1;
`;
export const EventDetailsDates = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ActionButtonsCont = styled.div`
  display: flex;
  width: 190px;
  justify-content: space-between;
`;
