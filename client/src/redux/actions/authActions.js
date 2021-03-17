import axios from "axios";
import { apiUrl_user } from "../../helpers";
import {
	API_LOADING_START,
	API_LOADING_SUCCESS,
	API_LOADING_ERROR,
	AUTH_SIGN,
	AUTH_LOGOUT,
} from "../types";
import Swal from "sweetalert2";

export const loginAction = (data) => {
	return async (dispatch) => {
		dispatch({ type: API_LOADING_START });
		try {
			const response = await axios.post(`${apiUrl_user}/login`, data);
			const {
				id,
				email,
				fullname,
				username,
				imagepath,
				phone,
				roleID,
				userStatusId,
				emailVerificationID,
				token,
			} = response.data;
			localStorage.setItem("token", token);
			dispatch({
				type: AUTH_SIGN,
				payload: {
					id,
					email,
					fullname,
					username,
					imagepath,
					phone,
					roleID,
					userStatusId,
					isLogin: true,
					emailVerificationID,
				},
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.message,
			});
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
				footer: `Email and Password doesn't match`,
			});
		}
	};
};

export const keepLoginAction = () => {
	return async (dispatch) => {
		dispatch({ type: API_LOADING_START });
		try {
			const token = localStorage.getItem("token");
			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await axios.post(
				`${apiUrl_user}/keepLogin`,
				{},
				headers
			);
			const {
				id,
				email,
				fullname,
				username,
				imagepath,
				phone,
				roleID,
				userStatusId,
				emailVerificationID,
			} = response.data;
			dispatch({
				type: AUTH_SIGN,
				payload: {
					id,
					email,
					fullname,
					username,
					imagepath,
					phone,
					roleID,
					userStatusId,
					emailVerificationID,
				},
			});
			dispatch({
				type: API_LOADING_SUCCESS,
			});
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.message,
			});
		}
	};
};

export const logoutAction = () => {
	return (dispatch) => {
		localStorage.removeItem("token");
		dispatch({
			type: AUTH_LOGOUT,
		});
	};
};
