import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension'
import RootSaga from '../RootSaga';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
     rootReducer,
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     ? composeWithDevTools(applyMiddleware(sagaMiddleware))
     : compose(applyMiddleware(sagaMiddleware))
     )
     sagaMiddleware.run(RootSaga)

export default store;