import axios from 'axios';
import {ActionCreator} from './store/reducer';


export const simpleApi = axios.create({
  baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
  timeout: 5000,
  withCredentials: true,
});

const createAPI = (dispatch) => {
  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.authorize(false));
    }

    return err;
  };

  simpleApi.interceptors.response.use(onSuccess, onFail);

  return simpleApi;
};

export default createAPI;
