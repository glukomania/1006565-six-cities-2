import {getCoords, filterOffers} from './actions';
import {reducer, initialState, ActionCreator} from './reducer';
import {offers} from '../mocks-for-tests';
import MockAdapter from 'axios-mock-adapter';
import configureAPI from '../api';
import {init} from '../components/app/app.connect';

describe(`Business logic is correct`, () => {
  it(`Coords are taken correctly`, () => {
    expect(getCoords(`Amsterdam`, offers)).toEqual([`52.369553943508`, `4.85309666406198`]);
  });

  it(`Offers are taken correctly`, () => {
    expect(filterOffers(`Amsterdam`, offers).length).not.toEqual(0);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for city change returns new city`, () => {
    expect(ActionCreator.changeCity(`Berlin`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Berlin`,
    });
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


  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(configureAPI);
    const dispatch = jest.fn();
    const loadOffers = () => init(`Amsterdam`, dispatch);

    apiMock
      .onGet(`./hotels`)
      .reply(200, [{city: {name: `Me`}}]);

    return loadOffers()
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });
});
