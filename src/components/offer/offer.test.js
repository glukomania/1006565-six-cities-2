import renderer from 'react-test-renderer';
import {Offer} from './offer';
import {offers} from '../../mocks-for-tests';
import {feedbacks} from '../../mocks-for-tests';

jest.mock(`../header/header`, () => `Header`);
jest.mock(`../map/map`, () => `Map`);

it(`Offer details are displayed correctly`, () => {

  const props = {
    offer: offers,
    allOffers: offers,
    feedbacks,
    onOfferClick: jest.fn(),
    currentCity: `Amsterdam`,
    isAuthorized: false,
    userCredentials: {email: `test@test.com`},
    favorites: offers,
    setFavorite: jest.fn(),
    loadFavorites: jest.fn(),
    history: {push: `/`},
    match: {params: {id: 1}}

  };

  const offer = renderer
    .create(<Offer {...props} />)
    .toJSON();

  expect(offer).toMatchSnapshot();

});
