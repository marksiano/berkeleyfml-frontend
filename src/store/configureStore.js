import rootReducer from '../reducers';
import {compose, applyMiddleware, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import * as Actions from '../actions';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      autoRehydrate(),
      window.devToolsExtension ? window.devToolsExtension() : undefined
    )
  );

  // begin periodically persisting the store
  persistStore(store, {blacklist: ['posts', 'pages', 'comments', 'modal', 'authorization']}, () => {
    store.dispatch(Actions.rehydrationComplete());
    console.log('rehyrdration complete')
  }
    )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}