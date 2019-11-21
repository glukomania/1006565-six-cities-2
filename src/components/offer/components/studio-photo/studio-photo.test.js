import renderer from 'react-test-renderer';
import StudioPhoto from './property-photo';

it(`Property photos are displayed correctly`, () => {
  const propertyPhoto = renderer
    .create(<StudioPhoto
      src={`img/apartment-01.jpg`}
    />)
  .toJSON();
  expect(propertyPhoto).toMatchSnapshot();
});
