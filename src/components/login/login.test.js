import renderer from 'react-test-renderer';
import Login from './login';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reducer} from '../../store/reducer';
import {BrowserRouter as Router} from 'react-router-dom';

it(`Login page is displayed correctly`, () => {
  const store = createStore(reducer);
  const login = renderer
    .create(<Provider store={store}><Router><Login /></Router></Provider>)
  .toJSON();
  expect(login).toMatchSnapshot();
});
