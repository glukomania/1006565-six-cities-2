import renderer from 'react-test-renderer';
import Map from './map';
import {offers} from '../../mocks-for-tests';

const coords = [52.3709553943508, 4.919309666406198];

const createNodeMock = (element) => {
  if (element.type === `div`) {
    return document.createElement(`div`);
  }
  return null;
};

const options = {createNodeMock};

it(`Map component is displayed correctly`, () => {
  const activeCardCoords = [50, 20];
  const props = {
    currentCoords: coords,
    currentOffers: offers,
    currentCity: `Amsterdam`,
    isOffer: false,
    activeCardCoords,
  };

  const map = renderer
    .create(<Map {...props} />, options)
    .toJSON();
  expect(map).toMatchSnapshot();
});
