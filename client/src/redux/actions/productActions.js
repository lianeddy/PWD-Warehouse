import axios from "axios";
import { apiUrl_product } from "../../helpers";
import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	GET_PRODUCTS,
	NULLIFY_ERROR,
} from "../types";

const getProductsAction = (query = "") => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const response = await axios.get(`${apiUrl_product}?${query}`);
			const { maxPrice, minPrice, products } = response.data;
			dispatch({
				type: GET_PRODUCTS,
				payload: { maxPrice, minPrice, products },
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

export { getProductsAction };
