export const getAllCities = (offers) => {
  const uniqueCities = offers.reduce((acc, elem) => acc.add(elem.city.name), new Set());
  return Array.from(uniqueCities).slice(0, 6);
};
