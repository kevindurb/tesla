import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import callApi from './callApi';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  undefined,
  composeEnhancers(
    applyMiddleware(
      reduxThunk.withExtraArgument((request) =>
        store.dispatch(callApi(request))
      ),
    ),
  ),
);

export default store;
