import React from 'react';
import Card from './card';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

it(`Cards can be moused over`, () => {
  const cardOverHandler = jest.fn();
  const card = shallow(<Card
    onOfferOver={cardOverHandler}
    title={`title`}
    images={[``]}
    price={0}
    rating={0}
    type={`type`}
  />);

  card.simulate(`mouseOver`);

  expect(cardOverHandler).toHaveBeenCalledTimes(1);
});
