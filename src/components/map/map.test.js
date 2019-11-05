import renderer from 'react-test-renderer';
import Map from './map';

const coords = [52.3709553943508, 4.919309666406198];

const offers = [{
  id: 1,
  city: `Amsterdam`,
  coords: [52.3909553943508, 4.85309666406198],
}];

const createNodeMock = (element) => {
  if (element.type === `div`) {
    return document.createElement(`div`);
  }
  return null;
};

const options = {createNodeMock};

it(`Map component is displayed correctly`, () => {

  const map = renderer
    .create(<Map currentCoords={coords} currentOffers={offers}/>, options)
    .toJSON();
  expect(map).toMatchSnapshot();
});
