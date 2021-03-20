import axios from "axios";
import { API_LOADING_START, API_LOADING_SUCCESS } from "../types";
import { apiUrl_cart } from "../../helpers";

const cartGetAction = (payload) => {
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

export { cartGetAction };
