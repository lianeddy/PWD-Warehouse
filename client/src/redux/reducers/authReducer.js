import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	AUTH_SIGN,
	AUTH_LOGOUT,
	NULLIFY_ERROR,
	RESET_INITIAL_STATE,
	REGISTERED_TRUE,
	CHANGE_PERMITTED,
} from "../types";

const INITIAL_STATE = {
	isLoading: false,
	isLogin: false,
	isError: false,
	securityQuestion: "",
	changePermitted: false,
	id: null,
	errorMessage: "",
	email: "",
	name: "",
	username: "",
	imagepath: "",
	phone: null,
	roleId: null,
	emailVerificationId: null,
	userStatusId: null,
	isFinished: true,
	wantToChangePass: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_LOADING_START:
			return {
				...state,
				isLoading: true,
				isFinished: false,
			};
		case API_LOADING_SUCCESS:
			return {
				...state,
				...action.payload,
				isLoading: false,
				isFinished: true,
			};
		case API_LOADING_ERROR:
			return {
				...state,
				errorMessage: action.payload,
				isError: true,
				isLoading: false,
				isFinished: true,
			};
		case AUTH_SIGN:
			return {
				...state,
				...action.payload,
				isLogin: true,
			};
		case AUTH_LOGOUT:
			return INITIAL_STATE;
		case NULLIFY_ERROR:
			return {
				...state,
				errorMessage: "",
				isError: false,
			};
		case REGISTERED_TRUE:
			return {
				...state,
				...action.payload,
			};
		case CHANGE_PERMITTED:
			return {
				...state,
				changePermitted: true,
			};
		case RESET_INITIAL_STATE:
			return INITIAL_STATE;
		default:
			return state;
	}
};

export { authReducer };
