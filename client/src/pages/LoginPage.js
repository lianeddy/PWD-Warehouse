import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { RESET_INITIAL_STATE } from "../redux/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faEyeSlash,
	faLock,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
	CButton,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CInput,
	CInputGroup,
	CInputGroupPrepend,
	CInputGroupText,
	CRow,
} from "@coreui/react";
import logo from "../assets/logo.png";
import { surfaceColor } from "../helpers";

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;
const user = <FontAwesomeIcon icon={faUser} />;
const lock = <FontAwesomeIcon icon={faLock} />;

const LoginPage = () => {
	const dispatch = useDispatch();
	const { isLoading, isLogin, roleId, wantToChangePass } = useSelector(
		(state) => state.authReducer
	);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	if (isLogin && roleId === 1) return <Redirect to="/admin" />;
	if (isLogin && roleId === 2) return <Redirect to="/products" />;

	if (!isLogin) {
		dispatch({
			type: RESET_INITIAL_STATE,
		});
	}

	if (wantToChangePass) {
		dispatch({
			type: RESET_INITIAL_STATE,
		});
	}

	return (
		<div className="c-app c-default-layout flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center mt-5">
					<CCol md="8">
						<CCardGroup>
							<CCard
								className="p-4"
								style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
							>
								<CCardBody>
									<CForm>
										<h1>Login</h1>
										<p className="text-muted">Sign In to your account</p>
										<CInputGroup className="mb-3">
											<CInputGroupPrepend>
												<CInputGroupText>
													<i>{user}</i>
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput
												name="email"
												onChange={(e) => setEmail(e.target.value)}
												type="text"
												placeholder="email"
											/>
										</CInputGroup>
										<CInputGroup className="mb-3">
											<CInputGroupPrepend>
												<CInputGroupText>
													<i>{lock}</i>
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput
												placeholder="Password"
												onChange={(e) => setPassword(e.target.value)}
												name="password"
												type={passwordShown ? "text" : "password"}
											/>
											<CInputGroupPrepend>
												<CInputGroupText>
													<i onClick={togglePasswordVisibility}>
														{passwordShown ? <i>{eye} </i> : <i>{eyeSlash} </i>}
													</i>
												</CInputGroupText>
											</CInputGroupPrepend>
										</CInputGroup>
										<CRow>
											<CCol xs="6">
												<CButton
													style={{
														backgroundColor: surfaceColor,
														borderWidth: 0,
													}}
													className="px-4"
													disabled={isLoading}
													onClick={() =>
														dispatch(loginAction({ email, password }))
													}
												>
													{isLoading ? <Spinner /> : "Login"}
												</CButton>
											</CCol>
											<CCol xs="6" className="text-right">
												<Link to="forget-password">
													<CButton color="link" className="px-0">
														Forgot password?
													</CButton>
												</Link>
											</CCol>
										</CRow>
									</CForm>
								</CCardBody>
							</CCard>
							<CCard
								className="text-white bg-secondary py-5 d-md-down-none"
								style={{
									width: "44%",
									borderTopRightRadius: 20,
									borderBottomRightRadius: 20,
								}}
							>
								<CCardBody className="text-center">
									<div>
										<h2>Sign up</h2>
										<br></br>
										<p>Welcome to Nature Goods Store!</p>
										<br></br>
										<p>Don't have an account?</p>
										<Link to="/register">
											<CButton
												style={{
													backgroundColor: surfaceColor,
													borderWidth: 0,
												}}
												className="mt-3"
												active
												tabIndex={-1}
											>
												Register Now!
											</CButton>
										</Link>
									</div>
								</CCardBody>
							</CCard>
						</CCardGroup>
						<div className="mb-5">
							<img src={logo} alt="file_err" height="210" />{" "}
						</div>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	);
};

export default LoginPage;
