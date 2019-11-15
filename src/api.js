import axios from 'axios';

const configureAPI = axios.create({
  baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
  timeout: 5000,
  withCredentials: true,
});

const onSuccess = (response) => response;

const onFail = (err) => {
  return err;
};

configureAPI.interceptors.response.use(onSuccess, onFail);

export default configureAPI;
