import axios from "axios";
import {
  API_LOADING_ERROR,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  NULLIFY_ERROR,
} from "../types";
import { apiUrl_cart } from "../../helpers";
import Swal from "sweetalert2";

export const addToCartAction = ({ id, user_id, qty }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: NULLIFY_ERROR });
      dispatch({ type: API_LOADING_START });
      const response = await axios.post(`${apiUrl_cart}/add-to-cart/${id}`, {
        qty,
        user_id,
      });
      dispatch({ type: API_LOADING_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({
        type: API_LOADING_ERROR,
        payload: err.response.data.message,
      });
      Swal.fire({
        title: "You Haven't Signed In Yet!",
        text: `Please Sign In to Buy Something`,
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: NULLIFY_ERROR });
        }
      });
    }
  };
};

export const changeQtyCartAction = ({ qty, user_id }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: NULLIFY_ERROR });
      dispatch({ type: API_LOADING_START });
      await axios.patch(`${apiUrl_cart}/${user_id}`, { qty });
    } catch (err) {
      dispatch({ type: API_LOADING_ERROR, payload: err.response.data.error });
    }
  };
};

export const cartGetAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: API_LOADING_START,
      });

      const response = await axios.get(`${apiUrl_cart}/get/${payload.id}`);

      dispatch({
        type: API_LOADING_SUCCESS,
        payload: { cart: response.data },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
