import renderer from 'react-test-renderer';
import Details from './offer';

it(`Property details are displayed correctly`, () => {
  const details = renderer
    .create(<Details
      offer={{
        id: 0,
        name: `name`,
        images: [`img/apartment-01.jpg`],
        price: 1,
        rating: 1,
        type: `type`,
        propFeatures: {entire: `Entire place`, bedroom: 0, adults: 0},
        insideItems: [`Wi-Fi`, `Washing machine`],
        host: {name: `William`, status: `Free`, avatar: `img/avatar-angelina.jpg`},
        description: `desc`,
      }}
    />)
    .toJSON();

  expect(details).toMatchSnapshot();

});
