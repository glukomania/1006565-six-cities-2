import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

it(`App correctly renders after launch`, () => {
  const app = renderer
    .create(<App
      offers={[]}
    />)
  .toJSON();

  expect(app).toMatchSnapshot();
});
