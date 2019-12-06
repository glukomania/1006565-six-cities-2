import renderer from 'react-test-renderer';
import {FavoritesList} from './favorites-list';
import {offers} from '../../mocks-for-tests';

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

jest.mock(`./components/favorite-city/favorite-city`, () => `FavoriteCity`);
jest.mock(`../header/header`, () => `Header`);

it(`FavoritesList is displayed correctly`, () => {
  const loadFavorites = jest.fn();

  const props = {
    city: `Amsterdam`,
    favorites: offers,
  };

  const favoriteList = renderer
    .create(<FavoritesList {...props} loadFavorites={loadFavorites}/>)
  .toJSON();

  expect(favoriteList).toMatchSnapshot();
});
