import * as React from 'react';
import BigSpinner from '../../Atoms/BigSpinner';
import { InitialLoadingCont, InitialLoadingText } from './styles';

const InitialLoading: React.FC = () => {
  return (
    <InitialLoadingCont>
      <BigSpinner />
      <InitialLoadingText>Loading</InitialLoadingText>
    </InitialLoadingCont>
  );
};

export default InitialLoading;
