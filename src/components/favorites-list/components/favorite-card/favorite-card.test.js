import renderer from 'react-test-renderer';
import {FavoriteCard} from './favorite-card';
import {offers} from '../../../../mocks-for-tests';

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

it(`FavoriteCard is displayed correctly`, () => {

  const props = {
    isInner: true,
    isAuthorized: false,
    favorite: offers[0],
  };

  const favoriteCard = renderer
    .create(<FavoriteCard {...props} />)
  .toJSON();

  expect(favoriteCard).toMatchSnapshot();
});
