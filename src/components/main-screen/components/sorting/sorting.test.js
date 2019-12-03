import renderer from 'react-test-renderer';
import Sorting from './sorting';

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

it(`Sorting is displayed correctly`, () => {

  const changeHandle = jest.fn();
  const dropDownHandler = jest.fn();

  const sorting = renderer
    .create(<Sorting changeHandle={changeHandle} dropDownHandler={dropDownHandler}/>)
  .toJSON();

  expect(sorting).toMatchSnapshot();
});
