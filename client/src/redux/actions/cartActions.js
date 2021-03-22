import axios from "axios";
import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	NULLIFY_ERROR,
} from "../types";
import { apiUrl_cart } from "../../helpers";
import Swal from "sweetalert2";

const addToCartAction = ({ id, user_id, qty }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const response = await axios.post(`${apiUrl_cart}/add-to-cart/${id}`, {
				qty,
				user_id,
			});
			dispatch({ type: API_LOADING_SUCCESS, payload: response.data });
			Swal.fire({
				title: "Added To Cart",
				icon: "success",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			});
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

const changeQtyCartAction = ({ qty, user_id }) => {
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

const cartGetAction = (payload) => {
	return async (dispatch) => {
		try {
			const userId = payload.id ? payload.id : payload.userId;
			dispatch({
				type: API_LOADING_START,
			});

			const response = await axios.get(`${apiUrl_cart}/get/${userId}`);

			dispatch({
				type: API_LOADING_SUCCESS,
				payload: { cart: response.data },
			});
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const updateCartQty = (payload) => {
	const { userId, cartId, qty } = payload;

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.patch(`${apiUrl_cart}/update-qty/${cartId}`, { qty });

			dispatch(cartGetAction({ userId }));
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const deleteCart = (payload) => {
	const { userId, cartId } = payload;

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.delete(`${apiUrl_cart}/delete/${cartId}`);

			dispatch(cartGetAction({ userId }));
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

export {
	cartGetAction,
	updateCartQty,
	deleteCart,
	addToCartAction,
	changeQtyCartAction,
};
