import renderer from 'react-test-renderer';
import Map from './map';

it(`Map component is displayed correctly`, () => {
  const props = [{coords: [52.3709553943508, 4.919309666406198]}];

  const map = renderer
    .create(<Map offers={props}/>, {
      createNodeMock: (element) => {
        if (element.type === `div`) {
          return document.createElement(`div`);
        }
        return null;
      }})
    .toJSON();
  expect(map).toMatchSnapshot();
});
