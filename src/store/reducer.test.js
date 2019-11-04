import {getCoords, getOffers} from './actions';
import {reducer, initialState, ActionCreator} from './reducer';

describe(`Business logic is correct`, () => {
  it(`Coords are taken correctly`, () => {
    expect(getCoords(`Amsterdam`)).toEqual([52.3909553943508, 4.85309666406198]);
    expect(getCoords(`Boo`)).toBeNull();
  });

  it(`Offers are taken correctly`, () => {
    expect(getOffers(`Amsterdam`).length).not.toEqual(0);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for city change returns new city`, () => {
    expect(ActionCreator.changeCity(`Berlin`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Berlin`,
    });
  });

  it(`Action creator for coords change returns new coords`, () => {
    expect(ActionCreator.changeCoords(`Amsterdam`)).toEqual({
      type: `CHANGE_COORDS`,
      payload: [52.3909553943508, 4.85309666406198],
    });
  });

  it(`Action creator for offers getting returns new offers`, () => {
    expect(ActionCreator.getOffers(`Amsterdam`).length).not.toEqual(0);
  });

});


describe(`Reducer works correctly`, () => {
  it(`Reducer with no params should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should replace city by a given value`, () => {
    expect(reducer({
      currentCity: `Amsterdam`,
      currentCoords: [1, 1],
      currentOffers: [{city: `Amsterdam`, coords: [1, 1]}],
    }, {
      type: `CHANGE_CITY`,
      payload: `Berlin`,
    })).toEqual({
      currentCity: `Berlin`,
      currentCoords: [1, 1],
      currentOffers: [{city: `Amsterdam`, coords: [1, 1]}]
    });
  });

  it(`Reducer should replace coords by a given value`, () => {
    expect(reducer({
      currentCity: `Amsterdam`,
      currentCoords: [1, 1],
      currentOffers: [{city: `Amsterdam`, coords: [1, 1]}],
    }, {
      type: `CHANGE_COORDS`,
      payload: [2, 2],
    })).toEqual({
      currentCity: `Amsterdam`,
      currentCoords: [2, 2],
      currentOffers: [{city: `Amsterdam`, coords: [1, 1]}],
    });
  });

  it(`Reducer should replace offers by a given value`, () => {
    expect(reducer({
      currentCity: `Amsterdam`,
      currentCoords: [1, 1],
      currentOffers: [{city: `Amsterdam`, coords: [1, 1]}],
    }, {
      type: `GET_OFFERS`,
      payload: [{city: `Berlin`, coords: [2, 2]}],
    })).toEqual({
      currentCity: `Amsterdam`,
      currentCoords: [1, 1],
      currentOffers: [{city: `Berlin`, coords: [2, 2]}],
    });
  });
});
