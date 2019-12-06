// export const offers = [
//   {
//     id: 1,
//     city: {
//       name: `Amsterdam`,
//       location: {
//         latitude: `52.369553943508`,
//         longitude: `4.85309666406198`,
//       }
//     },
//     name: `Beautiful & luxurious apartment at great location`,
//     images: [`img/apartment-02.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`],
//     price: 80,
//     rating: 80,
//     type: `Private room`,
//     propFeatures: {entire: `Entire place`, bedroom: 3, adults: 3},
//     insideItems: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
//     host: {name: `William`, status: `Free`, avatar: `img/avatar-angelina.jpg`},
//     description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
//     location: {
//       latitude: `52.369553943508`,
//       longitude: `4.85309666406198`
//     },
//   },
//   {
//     id: 2,
//     city: {
//       name: `Amsterdam`,
//       location: {
//         latitude: `52.369553943508`,
//         longitude: `4.85309666406198`,
//       }
//     },
//     name: `Beautiful & luxurious apartment at great location`,
//     images: [`img/apartment-02.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`],
//     price: 80,
//     rating: 80,
//     type: `Private room`,
//     propFeatures: {entire: `Entire place`, bedroom: 3, adults: 3},
//     insideItems: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
//     host: {name: `William`, status: `Free`, avatar: `img/avatar-angelina.jpg`},
//     description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
//     location: {
//       latitude: `52.369553943508`,
//       longitude: `4.85309666406198`
//     },
//   },
//   {
//     id: 3,
//     city: {
//       name: `Berlin`,
//       location: {
//         latitude: `55.1`,
//         longitude: `4.1`,
//       }
//     },
//     name: `Beautiful & luxurious apartment at great location`,
//     images: [`img/apartment-02.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`],
//     price: 80,
//     rating: 80,
//     type: `Private room`,
//     propFeatures: {entire: `Entire place`, bedroom: 3, adults: 3},
//     insideItems: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
//     host: {name: `William`, status: `Free`, avatar: `img/avatar-angelina.jpg`},
//     description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
//     location: {
//       latitude: `55.1`,
//       longitude: `4.1`
//     },
//   },
// ];


export const offers = [
  {
    'id': 1,
    'city': {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    },
    'preview_image': `img/1.png`,
    'images': [`img/1.png`, `img/2.png`],
    'title': `Beautiful & luxurious studio at great location`,
    'is_favorite': false,
    'is_premium': false,
    'rating': 4.8,
    'type': `apartment`,
    'bedrooms': 3,
    'max_adults': 4,
    'price': 120,
    'goods': [`Heating`, `Kitchen`, `Cable TV`],
    'host': {
      'id': 3,
      'is_pro': true,
      'name': `Angelina`,
      'avatar_url': `img/1.png`
    },
    'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    'location': {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  }
];


export const feedbacks = [
  {
    id: 1,
    user: {
      'id': 4,
      'is_pro': false,
      'name': `Max`,
      'avatar_url': `img/1.png`
    },
    rating: 4,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-08T14:13:56.569Z`,
  }
];
