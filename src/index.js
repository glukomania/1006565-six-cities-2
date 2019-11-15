import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import createAPI from './api';
import {reducer} from './store/reducer';
import App from './components/app/app.connect';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.querySelector(`#root`));
};

init();
