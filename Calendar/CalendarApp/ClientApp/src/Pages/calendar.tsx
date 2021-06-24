import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsBegin } from '../Actions/Redux/eventsReduxActions';
import { fetchCitiesBegin, fetchColorsBegin } from '../Actions/Redux/generalReduxActions';
import BigErrorToast from '../Components/Molecules/BigErrorToast';
import InitialLoading from '../Components/Molecules/InitialLoading';
import CalendarBody from '../Components/Organisms/CalendarBody';
import CalendarHeader from '../Components/Organisms/CalendarHeader';
import CalendarSubHeader from '../Components/Organisms/CalendarSubHeader';
import { RootState } from '../Store/configureStore';
import { ErrorContainer, ComponentsContainer, LoadingContainer } from './styles';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.eventsReducer);

  React.useEffect(() => {
    dispatch(fetchCitiesBegin());
    dispatch(fetchColorsBegin());
    dispatch(fetchEventsBegin());
  }, [dispatch]);

  if (state.error) {
    return (
      <ErrorContainer>
        <BigErrorToast message={state.error} />
      </ErrorContainer>
    );
  }

  return (
    <React.Fragment>
      {state.loading && (
        <LoadingContainer>
          <InitialLoading />
        </LoadingContainer>
      )}
      <ComponentsContainer>
        <CalendarHeader />
        <CalendarSubHeader />
        <CalendarBody />
      </ComponentsContainer>
    </React.Fragment>
  );
};

export default Calendar;
