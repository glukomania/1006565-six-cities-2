import renderer from 'react-test-renderer';
import {Card} from './card';
import {offers} from '../../mocks-for-tests';

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

it(`Cards are displayed correctly`, () => {

  const card = renderer
    .create(<Card
      id={1}
      title={`title`}
      images={[`img/apartment-01.jpg`]}
      price={0}
      rating={50}
      type={`type`}
      isPremium={false}
      favorites={offers}
    />)
  .toJSON();
  expect(card).toMatchSnapshot();
});
