import {offers} from '../mocks/offers';

export const getCoords = (city) => {
  const offer = offers.find((item) => item.city === city);

  return offer === undefined ? null : offers.find((item) => item.city === city).coords;
};

export const getOffers = (city) => {
  return offers.filter((item) => item.city === city);
};
