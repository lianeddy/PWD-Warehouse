import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/action";
import { Spinner, Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import "./styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;

const LoginPage2 = () => {
	const dispatch = useDispatch();
	const { loading, isLogin } = useSelector((state) => state.user);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	if (isLogin) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<div className="App">
				<div>
					<input
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						placeholder="email"
					/>
					<div className="pass-wrapper">
						<input
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							name="password"
							type={passwordShown ? "text" : "password"}
						/>
						<i onClick={togglePasswordVisibility}>{eye}</i>
					</div>
					<Button
						disabled={loading}
						onClick={() => dispatch(loginAction({ email, password }))}
					>
						{loading ? <Spinner /> : "Login"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage2;
