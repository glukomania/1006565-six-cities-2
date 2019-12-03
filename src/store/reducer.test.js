import {filterOffers} from './actions';
import {reducer, initialState, ActionCreator} from './reducer';
import {offers, feedbacks} from '../mocks-for-tests';
import MockAdapter from 'axios-mock-adapter';
import createAPI from '../api';
import {Operations} from './reducer';

describe(`Business logic is correct`, () => {
  it(`Offers are taken correctly`, () => {
    expect(filterOffers(`Amsterdam`, offers).length).not.toEqual(0);
  });
});

describe(`Action creators work correctly`, () => {
  it(`cityChange returns new city`, () => {
    expect(ActionCreator.changeCity(`Berlin`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Berlin`,
    });
  });

  it(`loadOffers returns new offers`, () => {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: `LOAD_OFFERS`,
      payload: {
        offers,
        isLoading: false,
      }
    });
  });

  it(`authorize returns new offers`, () => {
    expect(ActionCreator.authorize(true)).toEqual({
      type: `AUTHORIZE`,
      payload: true,
    });
  });

  it(`setEmail returns new offers`, () => {
    expect(ActionCreator.setEmail(`test@test.com`)).toEqual({
      type: `SET_EMAIL`,
      payload: `test@test.com`,
    });
  });

  it(`getFeedbacks returns new offers`, () => {
    expect(ActionCreator.getFeedbacks(feedbacks)).toEqual({
      type: `GET_FEEDBACKS`,
      payload: feedbacks,
    });
  });

  it(`setSortedOffers returns new offers`, () => {
    expect(ActionCreator.setSortedOffers(offers)).toEqual({
      type: `SET_SORTED_OFFERS`,
      payload: offers,
    });
  });

  it(`getUserCredentials returns new offers`, () => {
    expect(ActionCreator.getUserCredentials({user: `test`})).toEqual({
      type: `SET_USER_CREDENTIALS`,
      payload: {user: `test`},
    });
  });

  it(`getFavorites returns new offers`, () => {
    expect(ActionCreator.getFavorites(offers)).toEqual({
      type: `GET_FAVORITES`,
      payload: offers,
    });
  });

  it(`setActivePinCoords returns new offers`, () => {
    expect(ActionCreator.setActivePinCoords([30, 40])).toEqual({
      type: `SET_ACTIVE_PIN`,
      payload: [30, 40],
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


  const onError = jest.fn();
  const api = createAPI(onError);
  const apiMock = new MockAdapter(api);

  it(`Should make a correct API call to /hotels`, () => {
    const loadOffers = Operations.loadOffers();
    const dispatch = jest.fn();

    apiMock
      .onGet(`./hotels`)
      .reply(200, [{city: {name: `Am`}}]);

    return loadOffers(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });

  it(`Should make a correct API call to /comments`, () => {
    const id = 1;
    const loadFeedbacks = Operations.loadFeedbacks(id);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/comments/` + id)
      .reply(200, [{feedbacks: [`test`]}]);

    return loadFeedbacks(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `GET_FEEDBACKS`,
          payload: [{feedbacks: [`test`]}]
        }
        );
      });
  });

  it(`Should make a correct POST to /login`, () => {
    const dispatch = jest.fn();
    const userData = {
      email: `test@test.com`,
      password: `111`
    };
    const sendCredentials = Operations.sendCredentials(userData, jest.fn());

    apiMock
      .onPost(`/login`, userData)
      .reply(200, {name: `test`, avatarUrl: ``, isPro: true, email: `test@test.com`});

    return sendCredentials(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
  });

  it(`Should make a correct POST to /comments`, () => {
    const comment = {
      rating: 2,
      comment: `test149`
    };
    const id = 1;

    const sendComment = Operations.sendComment(id, comment);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/comments/` + id, comment)
      .reply(200, [{feedbacks: [`test`]}]);

    return sendComment(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `GET_FEEDBACKS`,
          payload: [{feedbacks: [`test`]}]
        }
        );
      });
  });


  it(`Should make a correct GET to /favorites`, () => {
    const loadFavorites = Operations.loadFavorites();
    const dispatch = jest.fn();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{favorites: [`test`]}]);

    return loadFavorites(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `GET_FAVORITES`,
          payload: [{favorites: [`test`]}]
        }
        );
      });
  });

});
