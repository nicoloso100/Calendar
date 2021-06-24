import styled from 'styled-components';

export const ComponentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 30px;
`;

export const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  background-color: rgba(130, 130, 130, 0.5);
`;
