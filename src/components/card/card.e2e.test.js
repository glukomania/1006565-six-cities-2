import React from 'react';
import Card from './card';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

it(`Cards'headers are handeled`, () => {
  const onTitleClickHandler = jest.fn();
  const card = shallow(<Card
    title={`title`}
    onTitleClick={onTitleClickHandler}
  />);
  const placeTitle = card.find(`.place-card_title`);
  placeTitle.simulate(`click`);

  expect(onTitleClickHandler).toHaveBeenCalledTimes(1);
});
