import { Modal, ModalBody } from 'reactstrap';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  max-width: 800px;
`;

export const StyledModalBody = styled(ModalBody)<{ $color: string }>`
  transition-duration: 0.2s;
  background-color: ${(props) => props.$color};
`;

export const RequiredMark = styled.label`
  color: red;
`;
