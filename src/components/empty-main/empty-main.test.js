import renderer from 'react-test-renderer';
import EmptyMain from './empty-main';

jest.mock(`react-router-dom`, () => ({
  Link: () => null
}));

jest.mock(`../header/header`, () => `Header`);

it(`EmptyMain are displayed correctly`, () => {

  const emptyMain = renderer
    .create(<EmptyMain />)
  .toJSON();
  expect(emptyMain).toMatchSnapshot();
});
