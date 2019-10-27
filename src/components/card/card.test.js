import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';

it(`Cards are displayed correctly`, () => {
  const card = renderer
    .create(<Card
      id={1}
      title={`title`}
      images={[`img/apartment-01.jpg`]}
      price={0}
      rating={50}
      type={`type`}
    />)
  .toJSON();
  expect(card).toMatchSnapshot();
});
