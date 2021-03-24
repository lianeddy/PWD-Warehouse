import axios from "axios";
import { apiUrl_user } from "../../helpers";
import {
	API_LOADING_START,
	API_LOADING_SUCCESS,
	API_LOADING_ERROR,
	AUTH_SIGN,
	AUTH_LOGOUT,
	NULLIFY_ERROR,
	RESET_INITIAL_STATE,
	CHANGE_PERMITTED,
	REGISTERED_TRUE,
	WANT_TO_CHANGE_PASS,
	GET_CHANGE_PASSWORD_USER_DATA,
	GET_ADDRESS,
} from "../types";
import Swal from "sweetalert2";
import { cartGetAction } from "./cartActions";
import { getDashboard } from "./adminActions";

const loginAction = (data) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
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
				user_address,
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
					address: user_address,
				},
			});
			dispatch(cartGetAction(id));
			dispatch(getDashboard());
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
			Swal.fire({
				title: "Your Email or Password is Wrong!",
				text: `${err.response.data.message}`,
				icon: "error",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "Ok",
			}).then((result) => {
				if (result.isConfirmed) {
					dispatch({ type: NULLIFY_ERROR });
				}
			});
		}
	};
};

const keepLoginAction = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
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
				user_address,
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
					address: user_address,
				},
			});
			dispatch(cartGetAction(id));
			// await dispatch(getDashboard());
			dispatch({
				type: API_LOADING_SUCCESS,
			});
		} catch (err) {
			dispatch({
				type: API_LOADING_SUCCESS,
			});
		}
	};
};

const logoutAction = () => {
	return (dispatch) => {
		dispatch({ type: NULLIFY_ERROR });
		localStorage.removeItem("token");
		dispatch({
			type: AUTH_LOGOUT,
		});
	};
};

const authRegisterAction = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: AUTH_LOGOUT });
			dispatch({ type: API_LOADING_START });
			localStorage.setItem("username", payload.username);
			localStorage.setItem("email", payload.email);
			const response = await axios.post(`${apiUrl_user}/register`, payload);
			if (response.status === 202) {
				dispatch({ type: API_LOADING_SUCCESS });
				return Swal.fire({
					icon: "warning",
					title: "Ooopsss...",
					text: `Message: ${response.data.message}`,
				});
			}
			Swal.fire({
				icon: "success",
				title: "Please Check Your Email For a Confirmation",
				text:
					"To complete the subscription process, please click the link in the email we just sent you.  If it doesn’t show up in a few minutes, check your spam folder.",
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const emailVerificationSuccessAction = (payload) => {
	return async (dispatch) => {
		try {
			const headers = {
				headers: {
					Authorization: `Bearer ${payload}`,
				},
			};
			const response = await axios.post(
				`${apiUrl_user}/email-verification`,
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
					userStatusId: user_status_id,
					emailVerificationId: email_verification_id,
				},
			});
			localStorage.removeItem("username");
			localStorage.removeItem("email");
			localStorage.setItem("token", response.data.token);
			Swal.fire({
				icon: "success",
				title: "Registered Successfully",
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.error });
		}
	};
};

const authRegisteredCheck = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const response = await axios.post(
				`${apiUrl_user}/registered-checker`,
				payload
			);
			const { id, email } = response.data;
			const security_question = response.data["security_question.question"];

			dispatch({
				type: REGISTERED_TRUE,
				payload: {
					id,
					email,
					securityQuestion: security_question,
					registered: true,
				},
			});

			dispatch({ type: WANT_TO_CHANGE_PASS });
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const authSecurityAnswerCheck = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.post(`${apiUrl_user}/security-question-checker`, payload);

			dispatch({
				type: CHANGE_PERMITTED,
			});

			dispatch({
				type: API_LOADING_SUCCESS,
			});
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const authChangePasswordEmailRequest = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.post(`${apiUrl_user}/change-password-email-request`, payload);

			alert(
				"Link untuk mengubah password sudah dikirim ke email anda. Silahkan cek email anda."
			);

			dispatch({
				type: API_LOADING_SUCCESS,
			});
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const getChangePasswordUserData = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const response = await axios.post(
				`${apiUrl_user}/registered-checker`,
				payload
			);
			const { id, email } = response.data;

			dispatch({
				type: GET_CHANGE_PASSWORD_USER_DATA,
				payload: { id, email, wantToChangePass: true, registered: true },
			});
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const authChangePassword = (payload) => {
	const { token, newPassword, id } = payload;

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			if (token) {
				await axios.patch(
					`${apiUrl_user}/change-password-with-email`,
					{ newPassword },
					headers
				);
			} else {
				await axios.patch(`${apiUrl_user}/change-password-without-email`, {
					newPassword,
					id,
				});
			}

			alert("Password berhasil diganti. Anda akan dialihkan ke halaman login.");

			dispatch({
				type: RESET_INITIAL_STATE,
			});
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const changeMainAddressAction = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const oldToken = localStorage.getItem("token");
			const headers = {
				headers: {
					Authorization: `Bearer ${oldToken}`,
				},
			};
			const response = await axios.patch(
				`${apiUrl_user}/change-main-address/`,
				payload,
				headers
			);
			localStorage.removeItem("token");
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
				user_address,
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
					address: user_address,
				},
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

export {
	authRegisterAction,
	logoutAction,
	keepLoginAction,
	loginAction,
	authRegisteredCheck,
	authSecurityAnswerCheck,
	authChangePasswordEmailRequest,
	authChangePassword,
	emailVerificationSuccessAction,
	getChangePasswordUserData,
	changeMainAddressAction,
};
