import renderer from 'react-test-renderer';
import FavoriteCity from './favorite-city';
import {offers} from '../../../../mocks-for-tests';

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

jest.mock(`../favorite-card/favorite-card`, () => `FavoriteCard`);

it(`FavoriteCity is displayed correctly`, () => {

  const props = {
    city: `Amsterdam`,
    favorites: offers,
  };

  const favoriteCity = renderer
    .create(<FavoriteCity {...props} />)
  .toJSON();

  expect(favoriteCity).toMatchSnapshot();
});
