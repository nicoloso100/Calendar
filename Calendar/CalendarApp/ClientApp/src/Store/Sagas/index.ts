import { all } from 'redux-saga/effects';
import getCitiesSaga from './citiesSagas';
import getColorsSaga from './colorsSagas';
import getEventSaga from './eventsSagas';

export default function* rootSaga() {
  yield all([getEventSaga(), getCitiesSaga(), getColorsSaga()]);
}
