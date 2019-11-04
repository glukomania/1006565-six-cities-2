import {offers} from '../mocks/offers';

export const getCoords = (city) => {
  if (offers.find((item) => item.city === city) === undefined) {
    return null;
  }
  return offers.find((item) => item.city === city).coords;
};

export const getOffers = (city) => {
  return offers.filter((item) => item.city === city);
};

export const test = (a) => a + 1;
