import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default (history, initialState = {}) => {
  const middlewares = [
    thunk,
    routerMiddleware(history)
    // Add other middlewares here
  ];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares)
    // Add other enhancers here
  );
  return createStore(rootReducer, initialState, enhancers);
};
