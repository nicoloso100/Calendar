import { call, put, takeLatest } from 'redux-saga/effects';
import { GetCities } from '../../Actions/API/generalActions';
import { fetchCitiesSuccess } from '../../Actions/Redux/generalReduxActions';

function* fetchCities() {
  try {
    const cities: ICity[] = yield call(GetCities);
    yield put(fetchCitiesSuccess(cities));
  } catch (error) {
    yield put(fetchCitiesSuccess(error.message));
  }
}

export default function* getCitiesSaga() {
  yield takeLatest<FETCH_CITIES>('FETCH_CITIES_BEGIN', fetchCities);
}
