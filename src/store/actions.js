export const getCoords = (city, allOffers) => {
  const offer = allOffers.find((item) => item.city.name === city);
  return [offer.city.location.latitude, offer.city.location.longitude];
};

export const filterOffers = (city, allOffers) => {
  return allOffers.filter((item) => item.city.name === city);
};
