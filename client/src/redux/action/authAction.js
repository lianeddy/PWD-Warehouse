import axios from 'axios';
import { apiUrl_user } from '../../helpers';
import {
  API_LOADING_ERROR,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  AUTH_SIGN,
  NULLIFY_ERROR,
} from '../types';

const authRegisterAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: NULLIFY_ERROR });
      dispatch({ type: API_LOADING_START });
      const response = await axios.post(`${apiUrl_user}/register`, payload);
      localStorage.setItem('token', response.data.token);
      console.log(response);
      if (response.status === 202) {
        return alert(response.data.message);
      }
      dispatch({ type: AUTH_SIGN, payload: response.data });
      dispatch({ type: API_LOADING_SUCCESS });
      alert('register success');
    } catch (err) {
      console.log(err.response);
      dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
    }
  };
};

export { authRegisterAction };
