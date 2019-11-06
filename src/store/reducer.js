import {getCoords, getOffers} from './actions';

const INITIAL_CITY = `Amsterdam`;
const INITIAL_COORDS = getCoords(INITIAL_CITY);
const INITIAL_OFFERS = getOffers(INITIAL_CITY);


export const initialState = {
  currentCity: INITIAL_CITY,
  currentCoords: INITIAL_COORDS,
  currentOffers: INITIAL_OFFERS,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: `CHANGE_CITY`,
    payload: city,
  }),

  changeCoords: (city) => ({
    type: `CHANGE_COORDS`,
    payload: getCoords(city),
  }),

  getOffers: (city) => ({
    type: `GET_OFFERS`,
    payload: getOffers(city),
  })
};


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      currentCity: action.payload,
    });

    case `CHANGE_COORDS`: return Object.assign({}, state, {
      currentCoords: action.payload,
    });


    case `GET_OFFERS`: return Object.assign({}, state, {
      currentOffers: action.payload,
    });
  }

  return state;
};
