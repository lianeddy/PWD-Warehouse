import {
	API_LOADING_START,
	NULLIFY_ERROR,
	API_LOADING_SUCCESS,
	API_LOADING_ERROR,
	GET_DASHBOARD,
	MONITORING,
	FILL_TRANSACTION_DATA,
} from "../types";
import axios from "axios";
import { apiUrl_admin, apiUrl_transaction } from "../../helpers";

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

const getAllTransaction = (payload) => {
	const { clickLoad } = payload;
	return async (dispatch) => {
		try {
			// console.log(clickLoad);

			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const response = await axios.get(
				`${apiUrl_transaction}/get-all-transaction/${clickLoad}`
			);

			dispatch({
				type: FILL_TRANSACTION_DATA,
				payload: response.data,
			});

			dispatch({
				type: API_LOADING_SUCCESS,
			});
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response,
			});
		}
	};
};

const approveBukti = (payload) => {
	const { transactionId, clickLoad } = payload;
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.patch(`${apiUrl_admin}/approve-bukti/${transactionId}`);

			console.log(clickLoad);

			dispatch(getAllTransaction({ clickLoad }));
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response,
			});
		}
	};
};

const rejectBukti = (payload) => {
	const { transactionId, clickLoad } = payload;
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.patch(`${apiUrl_admin}/reject-bukti/${transactionId}`);

			dispatch(getAllTransaction({ clickLoad }));
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response,
			});
		}
	};
};

const kirimBarang = (payload) => {
	const { transactionId, stockData, clickLoad } = payload;
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.patch(
				`${apiUrl_admin}/kirim-barang/${transactionId}`,
				stockData
			);

			dispatch(getAllTransaction({ clickLoad }));
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response,
			});
		}
	};
};

export {
	getDashboard,
	monitoringAction,
	getAllTransaction,
	approveBukti,
	rejectBukti,
	kirimBarang,
};
