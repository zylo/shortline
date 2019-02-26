import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension
        ? window.devToolsExtension()
        : (f) => {
            return f;
          }
    )
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      // disable rule .. used for local hot reloading only
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./rootReducer').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
