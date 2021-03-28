import {
	API_LOADING_START,
	NULLIFY_ERROR,
	API_LOADING_SUCCESS,
	API_LOADING_ERROR,
	GET_DASHBOARD,
	MONITORING,
} from "../types";
import axios from "axios";
import { apiUrl_admin } from "../../helpers";

const getDashboard = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const response = await axios.get(`${apiUrl_admin}/dashboard`);
			dispatch({ type: GET_DASHBOARD, payload: response.data });
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const monitoringAction = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const response = await axios.get(`${apiUrl_admin}/monitoring`);
			dispatch({ type: MONITORING, payload: response.data });
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

export { getDashboard, monitoringAction };
