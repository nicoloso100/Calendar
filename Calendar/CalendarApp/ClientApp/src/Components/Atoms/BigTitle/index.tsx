import * as React from 'react';
import { BigText } from './styles';

interface IBigTitleProps {
  text: string;
}

const BigTitle: React.FC<IBigTitleProps> = ({ text }) => {
  return <BigText>{text}</BigText>;
};

export default BigTitle;
