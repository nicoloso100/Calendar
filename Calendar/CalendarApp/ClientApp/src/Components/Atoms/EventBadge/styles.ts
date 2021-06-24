import styled from 'styled-components';

export const EventBadgeContainer = styled.div<{ $customColor?: string }>`
  width: 100%;
  color: #3b3b3b;
  background-color: ${(props) => (props.$customColor ? props.$customColor : '#9BCDFF')};
  margin-bottom: 3px;
  font-size: 13px;
  padding: 1px 5px;
  transition-duration: 0.2s;
  :hover {
    background-color: #a1bddb;
  }
`;
