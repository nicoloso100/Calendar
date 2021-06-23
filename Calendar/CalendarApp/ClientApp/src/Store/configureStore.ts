import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import eventsReducer from './Reducers/eventsReducer';
import rootSaga from './Sagas/eventsSagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(eventsReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
