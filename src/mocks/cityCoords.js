import {offers} from './offers';

export const cityCoords = [
  {city: `Amsterdam`, coords: [52.38333, 4.9]},
  {city: `Paris`, coords: [48.8533658, 2.3493036]},
  {city: `Cologne`, coords: [50.9383610, 6.9599740]},
  {city: `Brussels`, coords: [50.8465573, 4.3516970]},
  {city: `Hamburg`, coords: [53.5503410, 10.0006540]},
  {city: `Dusseldorf`, coords: [51.2254018, 6.7763137]},
];

const uniqueCities = offers.reduce((acc, elem) => acc.add(elem.city), new Set());

export const cities = Array.from(uniqueCities).slice(0, 5);
