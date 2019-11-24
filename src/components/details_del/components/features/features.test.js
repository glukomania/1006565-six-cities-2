import renderer from 'react-test-renderer';
import Features from './features';

it(`Features of property are displayed correctly`, () => {
  const features = renderer
    .create(<Features
      entire={`Entire`}
      bedroom={0}
      adults={0}
    />)
  .toJSON();
  expect(features).toMatchSnapshot();
});
