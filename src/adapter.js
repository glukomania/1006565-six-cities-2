// export class Adapter {
//   constructor(data) {
//     this.id = data[`id`];
//     this.city = data.city.name;
//     this.coords = [data[`city`].location.latitude, data[`city`].location.longitude];
//     this.images = data[`images`];
//   }

//   static parseOffer(data) {
//     return new Adapter(data);
//   }

//   static parseOffers(data) {
//     return data.map(Adapter.parseOffer);
//   }
// }

export const parseOffer = (offer) => {
  return {
    id: offer[`id`],
    city: offer.city.name,
    coords: [offer.city.location.latitude, offer[`city`].location.longitude],
    images: offer.images,
    previewImage: offer.preview_image,
    price: offer.price,
    rating: offer.rating * 10,
    type: offer.type,
    insideItems: offer.goods,
    propFeatures: {entire: ``}

  };
};


// {
//   id: 1,
//   city: `Amsterdam`,
//   name: `Beautiful & luxurious apartment at great location`,
//   images: [`img/apartment-02.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`],
//   price: 80,
//   rating: 80,
//   type: `Private room`,
//   propFeatures: {entire: `Entire place`, bedroom: 3, adults: 3},
//   insideItems: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
//   host: {name: `William`, status: `Free`, avatar: `img/avatar-angelina.jpg`},
//   description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
//   coords: [52.3909553943508, 4.85309666406198],
// },
