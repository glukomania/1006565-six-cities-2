import renderer from 'react-test-renderer';
import {City} from './city';

it(`City is displayed correctly`, () => {
  const city = renderer
    .create(<City
      city={`Test`}
      currentCity={`Amsterdam`}
    />)
    .toJSON();

  expect(city).toMatchSnapshot();
});
