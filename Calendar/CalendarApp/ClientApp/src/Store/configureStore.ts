import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import getCitiesReducer from './Reducers/getCitiesReducer';
import getColorsReducer from './Reducers/getColorsReducer';
import getEventsReducer from './Reducers/getEventsReducer';
import rootSaga from './Sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  eventsReducer: getEventsReducer,
  citiesReducer: getCitiesReducer,
  colorsReducer: getColorsReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof rootReducer>;
