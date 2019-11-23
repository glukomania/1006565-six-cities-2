export const getCoords = (city, allOffers) => {
  const offer = allOffers.find((item) => item.city.name === city);
  return [offer.city.location.latitude, offer.city.location.longitude];
};

export const filterOffers = (city, allOffers) => {
  return allOffers.filter((item) => item.city.name === city);
};

export const sortOffers = (offers, sortType) => {
  switch (sortType) {
    case `popular`:
      return [];
    case `priceHigh`:
      return offers.sort((a, b) => (a.price > b.price) ? -1 : 1);
    case `priceLow`:
      return offers.sort((a, b) => (a.price > b.price) ? 1 : -1);
    case `rated`:
      return offers.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
  }
  return console.log(`test`);
};

