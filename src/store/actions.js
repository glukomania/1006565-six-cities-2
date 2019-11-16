export const getCoords = (city, allOffers) => {
  const offer = allOffers.find((item) => item.city.name === city);
  return [offer.location.latitude, offer.location.longitude];
};

export const filterOffers = (city, allOffers) => {
  return allOffers.filter((item) => item.city.name === city);
};
