import renderer from 'react-test-renderer';
import MainScreen from './main-screen';
import {offers} from '../../mocks-for-tests';

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

jest.mock(`../header/header`, () => `Header`);
jest.mock(`../card/card`, () => `Card`);
jest.mock(`./components/city/city`, () => `City`);
jest.mock(`../map/map`, () => `Map`);
jest.mock(`./components/sorting/sorting`, () => `Sorting`);
jest.mock(`../empty-main/empty-main`, () => `EmptyMain`);

it(`FavoritesList is displayed correctly`, () => {
  const getCoords = jest.fn();
  const filterOffers = jest.fn();
  const sortOffers = jest.fn();
  const setSortedOffers = jest.fn();
  const setActivePinCoords = jest.fn();
  const history = {push: `/`};


  const props = {
    city: `Amsterdam`,
    favorites: offers,
  };

  const mainScreen = renderer
    .create(<MainScreen {...props}
      setSortedOffers={setSortedOffers}
      currentOffers={offers}
      allOffers={offers}
      currentCity={`Amsterdam`}
      setActivePinCoords={setActivePinCoords}
      history={history}
      sortOffers={sortOffers}
      filterOffers={filterOffers}
      getCoords={getCoords}
      isAuthorized={false}
    />)
  .toJSON();

  expect(mainScreen).toMatchSnapshot();
});
