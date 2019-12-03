import renderer from 'react-test-renderer';
import FavoriteEmpty from './favorite-emty';

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

jest.mock(`../header/header`, () => `Header`);

it(`FavoriteEmpty is displayed correctly`, () => {

  const props = {
    isInner: true,
    isAuthorized: false,
    bookmarkClickHandle: jest.fn(),
    setFavorite: jest.fn(),
  };

  const favoriteEmpty = renderer
    .create(<FavoriteEmpty {...props} />)
  .toJSON();

  expect(favoriteEmpty).toMatchSnapshot();
});
