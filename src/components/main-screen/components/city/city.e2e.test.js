import {City} from './city';
import {shallow} from 'enzyme';

it(`City choice work correctly`, () => {
  const cityClickHandler = jest.fn();
  const city = shallow(<City
    city={`Test`}
    currentCity={`CurrentCity`}
    onCityClick={cityClickHandler}
  />);

  city.simulate(`click`);

  expect(cityClickHandler).toHaveBeenCalledTimes(1);
});
