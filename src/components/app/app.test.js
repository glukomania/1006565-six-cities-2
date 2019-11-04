import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reducer} from '../../store/reducer';

it(`App correctly renders after launch`, () => {
  const store = createStore(reducer);
  const app = renderer
    .create(<Provider store={store}><App /></Provider>, {
      createNodeMock: (element) => {
        if (element.type === `div`) {
          return document.createElement(`div`);
        }
        return null;
      }})
  .toJSON();

  expect(app).toMatchSnapshot();
});
