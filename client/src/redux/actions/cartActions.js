import axios from "axios";
import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	NULLIFY_ERROR,
} from "../types";
import { apiUrl_cart } from "../../helpers";

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
			console.log(err);
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

export { cartGetAction, updateCartQty };
