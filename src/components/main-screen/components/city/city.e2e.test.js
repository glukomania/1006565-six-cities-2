import {City} from './city';
import {shallow} from 'enzyme';
import {offers} from '../../../../mocks-for-tests';

it(`City choice work correctly`, () => {
  const cityClickHandler = jest.fn();
  const city = shallow(<City
    city={`Test`}
    currentCity={`CurrentCity`}
    onCityClick={cityClickHandler}
    allOffers={offers}
  />);

  city.simulate(`click`);

  expect(cityClickHandler).toHaveBeenCalledTimes(1);
});
