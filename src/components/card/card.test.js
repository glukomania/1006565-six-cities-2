import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';

it(`Cards are displayed correctly`, () => {
  const card = renderer
    .create(<Card
      title={`title`}
      image={`img/apartment-01.jpg`}
      price={0}
      rating={50}
      type={`type`}
    />)
  .toJSON();
  expect(card).toMatchSnapshot();
});
