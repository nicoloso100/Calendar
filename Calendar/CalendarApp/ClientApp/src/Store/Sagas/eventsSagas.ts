import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GetEvents } from '../../Actions/API/eventsActions';
import { fetchEventsFailure, fetchEventsSuccess } from '../../Actions/Redux/eventsReduxActions';

function* fetchEvents() {
  try {
    const events: IEvent[] = yield call(GetEvents);
    yield put(fetchEventsSuccess(events));
  } catch (error) {
    yield put(fetchEventsFailure(error.message));
  }
}

function* getEventSaga() {
  yield takeLatest<FETCH_EVENTS>('FETCH_EVENTS_BEGIN', fetchEvents);
}

export default function* rootSaga() {
  yield all([getEventSaga()]);
}
