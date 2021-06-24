import * as React from 'react';
import { EventBadgeContainer } from './styles';

declare interface IEventBadgeProps {
  text: string;
  color?: string;
  onClick: () => void;
}

const EventBadge: React.FC<IEventBadgeProps> = ({ text, color, onClick }) => {
  const handleOnClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
    onClick();
  };

  return (
    <EventBadgeContainer onClick={handleOnClick} $customColor={color}>
      {text}
    </EventBadgeContainer>
  );
};

export default EventBadge;
