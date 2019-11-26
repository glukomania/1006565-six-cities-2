import renderer from 'react-test-renderer';
import InsideItem from './inside-item';

it(`Inside items are displayed correctly`, () => {
  const insideItem = renderer
    .create(<InsideItem
      item={`item`}
    />)
  .toJSON();
  expect(insideItem).toMatchSnapshot();
});
