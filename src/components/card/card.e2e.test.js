import {Card} from './card';
import {shallow} from 'enzyme';
import {offers} from '../../mocks-for-tests';

const props = {
  onOfferClick: jest.fn(),
  id: 1,
  title: `title`,
  images: [``],
  price: 0,
  rating: 0,
  type: `type`,
  isPremium: false,
  favorites: offers,
};

it(`Cards can be moused over`, () => {
  const handleOfferHover = jest.fn();
  const card = shallow(<Card {...props} handleOfferHover={handleOfferHover}/>);

  card.simulate(`mouseOver`);

  expect(handleOfferHover).toHaveBeenCalledTimes(1);
});

