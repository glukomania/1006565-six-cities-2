import Card from './card';
import {shallow} from 'enzyme';
it(`Cards can be moused over`, () => {
  const cardOverHandler = jest.fn();
  const card = shallow(<Card
    onOfferOver={cardOverHandler}
    id={1}
    title={`title`}
    images={[``]}
    price={0}
    rating={0}
    type={`type`}
  />);

  card.simulate(`mouseOver`);

  expect(cardOverHandler).toHaveBeenCalledTimes(1);
});

it(`Cards can be clicked`, () => {
  const cardClickHandler = jest.fn();
  const card = shallow(<Card
    onOfferClick={cardClickHandler}
    id={1}
    title={`title`}
    images={[``]}
    price={0}
    rating={0}
    type={`type`}
  />);

  card.simulate(`click`);

  const expectedObject = {
    id: 1,
    images: [``],
    onOfferClick: cardClickHandler,
    price: 0,
    rating: 0,
    title: `title`,
    type: `type`
  };

  expect(cardClickHandler).toHaveBeenCalledWith(expectedObject);
});
