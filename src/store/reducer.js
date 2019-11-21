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
  isAuthorized: false,
  email: undefined,
  feedbacks: [],
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

  authorize: (value) => ({
    type: `AUTHORIZE`,
    payload: value,
  }),

  setEmail: (value) => ({
    type: `SET_EMAIL`,
    payload: value
  }),

  getFeedbacks: (value) =>({
    type: `GET_FEEDBACKS`,
    payload: value
  }),
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

    case `AUTHORIZE`: return Object.assign({}, state, {
      isAuthorized: action.payload
    });

    case `SET_EMAIL`: return Object.assign({}, state, {
      email: action.payload
    });

    case `GET_FEEDBACKS`: return Object.assign({}, state, {
      feedbacks: action.payload
    });
  }

  return state;
};


export const Operations = {
  loadOffers: () => (dispatch, state, api) => {
    return api.get(`/hotels`)
    .then((respond) => {
      dispatch(ActionCreator.loadOffers(respond.data));
    });
  },
  loadFeedbacks: (id) => (dispatch, state, api) => {
    return api.get(`/comments/` + id)
      .then((respond) => {
        dispatch(ActionCreator.getFeedbacks(respond.data));
      });
  }
};
