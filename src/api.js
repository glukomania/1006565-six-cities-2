import axios from 'axios';
import {ActionCreator} from './store/reducer';


export const api = axios.create({
  baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
  timeout: 5000,
  withCredentials: true,
});

const createAPI = (dispatch) => {
  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 403 || err.response.status === 400 || err.response.status === 404) {
      dispatch(ActionCreator.authorize(false));
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
