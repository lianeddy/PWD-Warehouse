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
      const {
        id,
        email,
        full_name,
        username,
        imagepath,
        phone,
        role_id,
        user_status_id,
        email_verification_id,
      } = response.data;
      dispatch({
        type: AUTH_SIGN,
        payload: {
          id,
          email,
          name: full_name,
          username,
          imagepath,
          phone,
          roleId: role_id,
          userStatusId: user_status_id,
          emailVerificationId: email_verification_id,
        },
      });
      dispatch({ type: API_LOADING_SUCCESS });
      alert('register success');
    } catch (err) {
      console.log(err.response);
      dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
    }
  };
};

export { authRegisterAction };
