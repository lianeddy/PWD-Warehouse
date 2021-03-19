import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { authChangePassword } from "../../redux/actions/authActions";

const ChangePasswordPage = (props) => {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessege] = useState("");
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const { isLoading, id } = useSelector((state) => state.authReducer);

	const dispatch = useDispatch();

	let token;

	if (props.location.search) {
		token = new URLSearchParams(props.location.search).get("token");
	}

	if (!id) {
		return <Redirect to="/login" />;
	}

	const renderLoading = () => {
		return <div>Loading</div>;
	};

	const renderMain = () => {
		return (
			<>
				<div style={{ margin: "0 0 10px 0" }}>Masukkan Password Baru</div>
				<div>
					<input
						type={showPassword1 ? "text" : "password"}
						id="newPassword"
						placeholder="New Password"
						onChange={(e) => setNewPassword(e.target.value)}
						style={{ margin: "0 0 15px 0" }}
					/>
					<button onClick={() => setShowPassword1(!showPassword1)}>
						{showPassword1 ? (
							<i className="bi bi-eye-slash"></i>
						) : (
							<i className="bi bi-eye"></i>
						)}
					</button>
				</div>
				<div>
					<input
						type={showPassword2 ? "text" : "password"}
						id="confirmNewPassword"
						placeholder="Confirm New Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						style={{ margin: "0 0 10px 0" }}
					/>
					<button onClick={() => setShowPassword2(!showPassword2)}>
						{showPassword2 ? (
							<i className="bi bi-eye-slash"></i>
						) : (
							<i className="bi bi-eye"></i>
						)}
					</button>
				</div>
				<div style={{ margin: "0 0 10px 0" }}>{message}</div>
				<button
					onClick={() => {
						if (newPassword !== confirmPassword) {
							return setMessege("Password invalid");
						}

						if (token) {
							return dispatch(
								authChangePassword({
									newPassword,
									token,
								})
							);
						}

						dispatch(
							authChangePassword({
								newPassword,
								id,
							})
						);
					}}
				>
					Confirm
				</button>
			</>
		);
	};

	return (
		<div style={styles.style1}>
			<div style={styles.style2}>
				{isLoading ? renderLoading() : renderMain()}
			</div>
		</div>
	);
};

const styles = {
	style1: {
		height: "600px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	style2: {
		backgroundColor: "white",
		boxShadow: "2.5px 2.5px 10px rgba(0,0,0,0.2)",
		height: "400px",
		width: "350px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
};

export default ChangePasswordPage;
