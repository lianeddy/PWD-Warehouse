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
				full_name,
				username,
				imagepath,
				phone,
				role_id,
				user_status_id,
				email_verification_id,
				token,
			} = response.data;
			localStorage.setItem("token", token);
			dispatch({
				type: AUTH_SIGN,
				payload: {
					id,
					email,
					name: full_name,
					username,
					imagepath,
					phone,
					roleId: role_id,
					userStatusId: user_status_id,
					isLogin: true,
					emailVerificationId: email_verification_id,
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
				full_name,
				username,
				imagepath,
				phone,
				role_id,
				user_status_id,
				email_verification_id,
			} = response.data;
			dispatch({
				type: AUTH_SIGN,
				payload: {
					id,
					email,
					name: full_name,
					username,
					imagepath,
					phone,
					roleId: role_id,
					userStatusid: user_status_id,
					emailVerificationId: email_verification_id,
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
