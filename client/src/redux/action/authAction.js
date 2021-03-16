import axios from "axios";
import { api_url } from "../../helpers";
import {
	API_USER_START,
	API_USER_SUCCESS,
	API_USER_FAILED,
	LOGIN,
	// LOGOUT,
} from "../types";
import Swal from "sweetalert2";

const url = api_url + "/users";

export const loginAction = (data) => {
	return async (dispatch) => {
		dispatch({ type: API_USER_START });
		try {
			const response = await axios.post(`${url}/login`, data);
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
				type: LOGIN,
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
			dispatch({ type: API_USER_SUCCESS });
		} catch (err) {
			dispatch({ type: API_USER_FAILED, payload: err.response.data.message });
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
		dispatch({ type: API_USER_START });
		try {
			const token = localStorage.getItem("token");
			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await axios.post(`${url}/keepLogin`, {}, headers);
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
				type: LOGIN,
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
				type: API_USER_SUCCESS,
			});
		} catch (err) {
			dispatch({
				type: API_USER_FAILED,
				payload: err.message,
			});
		}
	};
};
