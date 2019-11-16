import {getCoords, filterOffers} from './actions';

const INITIAL_CITY = `Amsterdam`;
const INITIAL_COORDS = [];
const INITIAL_OFFERS = [];


export const initialState = {
  currentCity: INITIAL_CITY,
  currentCoords: INITIAL_COORDS,
  currentOffers: INITIAL_OFFERS,
  allOffers: [],
  isLoading: true,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: `CHANGE_CITY`,
    payload: city,
  }),

  changeCoords: (city, allOffers) => ({
    type: `CHANGE_COORDS`,
    payload: getCoords(city, allOffers),
  }),

  getOffers: (city, allOffers) => ({
    type: `GET_OFFERS`,
    payload: filterOffers(city, allOffers)
  }),

  loadOffers: (offers) => {
    return {
      type: `LOAD_OFFERS`,
      payload: {
        offers,
        isLoading: false
      }
    };
  },

  setLoadingState: (isLoading) => ({
    type: `IS_LOADING`,
    payload: isLoading
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

    case `LOAD_OFFERS`: return Object.assign({}, state, {
      allOffers: action.payload.offers,
      isLoading: action.payload.isLoading,
    });
  }

  return state;
};
