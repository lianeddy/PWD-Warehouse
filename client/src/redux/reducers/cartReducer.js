import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	NULLIFY_ERROR,
} from "../types";

const INITIAL_STATE = {
	cart: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_LOADING_START:
			return {
				...state,
				isLoading: true,
			};
		case API_LOADING_SUCCESS:
			return {
				...state,
				...action.payload,
				isLoading: true,
			};
		case API_LOADING_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				message: action.payload,
			};
		case NULLIFY_ERROR:
			return {
				...state,
				error: false,
				message: "",
			};
		default:
			return state;
	}
};

export { cartReducer };
