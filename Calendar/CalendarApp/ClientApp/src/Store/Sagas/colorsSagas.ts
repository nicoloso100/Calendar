import { call, put, takeLatest } from 'redux-saga/effects';
import { GetColors } from '../../Actions/API/generalActions';
import { fetchColorsSuccess } from '../../Actions/Redux/generalReduxActions';

function* fetchColors() {
  try {
    const colors: IColor[] = yield call(GetColors);
    yield put(fetchColorsSuccess(colors));
  } catch (error) {
    yield put(fetchColorsSuccess(error.message));
  }
}

export default function* getColorsSaga() {
  yield takeLatest<FETCH_COLORS>('FETCH_COLORS_BEGIN', fetchColors);
}
