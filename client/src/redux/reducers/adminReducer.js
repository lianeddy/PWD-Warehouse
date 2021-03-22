import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	GET_DASHBOARD,
	GET_PRODUCTS,
	NULLIFY_ERROR,
} from "../types";

const INITIAL_STATE = {
	isLoading: false,
	isError: false,
	errorMessage: false,
	dashboard: {},
};

const adminReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_LOADING_START:
			return {
				...state,
				isLoading: true,
			};
		case API_LOADING_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case API_LOADING_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};
		case NULLIFY_ERROR:
			return {
				...state,
				isError: false,
				errorMessage: "",
			};
		case GET_DASHBOARD:
			return {
				...state,
				dashboard: action.payload,
			};
		default:
			return state;
	}
};

export { adminReducer };
