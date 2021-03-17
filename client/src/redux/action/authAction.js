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

const authRegisteredCheck = (payload) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: "NULLIFY_ERROR"
      })  

      dispatch({
        type: "API_LOADING_START"
      })  

      const response = await axios.post(`${apiUrl_user}/registered-checker`, payload)
      const {id, email} = response.data
      const security_question = response.data["security_question.question"]

      dispatch({
        type: "API_LOADING_SUCCESS",
        payload: {
          id,
          email,
          security_question,
          registered: true,
        }
      })
    }catch(err) {
      dispatch({
        type: "API_LOADING_ERROR",
        payload: err.response.data.message
      })
    }
  }
}

const authSecurityAnswerCheck = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "NULLIFY_ERROR"
      })  

      dispatch({
        type: "API_LOADING_START"
      })

      await axios.post(`${apiUrl_user}/security-question-checker`, payload)

      dispatch({
        type: "API_LOADING_SUCCESS",
        payload: {
          changePermitted: true,
        }
      })
    }catch(err) {
      dispatch({
        type: "API_LOADING_ERROR",
        payload: err.response.data.message
      })
    }
  }
}

const authChangePasswordEmailRequest = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "NULLIFY_ERROR"
      })  

      dispatch({
        type: "API_LOADING_START"
      })

      await axios.post(`${apiUrl_user}/change-password-email-request`, payload)

      alert("Link untuk mengubah password sudah dikirim ke email anda. Silahkan cek email anda.")

      dispatch({
        type: "API_LOADING_SUCCESS",
      })
    }catch(err) {
      dispatch({
        type: "API_LOADING_ERROR",
        payload: err.response.data.message
      })
    }
  }
}

const authChangePassword = (payload) => {
  const {token, newPassword, id} = payload
  console.log(token)

  return async (dispatch) => {
    try{
      dispatch({
        type: "NULLIFY_ERROR"
      })  

      dispatch({
        type: "API_LOADING_START"
      })

      const headers = {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }

      if(token) {
        await axios.patch(`${apiUrl_user}/change-password-with-email`, {newPassword}, headers)
      }else{
        await axios.patch(`${apiUrl_user}/change-password-without-email`, {newPassword, id})
      }

      alert("Password berhasil diganti. Anda akan dialihkan ke halaman login.")

      dispatch({
        type: "NULLIFY_ALL",
      })
    }catch(err) {
      dispatch({
        type: "API_LOADING_ERROR",
        payload: err.response.data.message
      })
    }
  }
}

export { authRegisterAction, authRegisteredCheck, authSecurityAnswerCheck, authChangePasswordEmailRequest, authChangePassword };
