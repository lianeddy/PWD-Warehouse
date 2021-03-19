import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl_user, primaryColor, surfaceColor } from "../helpers";
import { authRegisterAction } from "../redux/actions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";

const RegisterPage = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.authReducer);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");
	const [name, setName] = useState("");
	const [securityQuestion, setSecurityQuestion] = useState([]);
	const [securityAnswer, setSecurityAnswer] = useState("");
	const [securityQuestionId, setSecurityQuestionId] = useState(1);
	const [policyCheck, setPolicyCheck] = useState(false);

	useEffect(async () => {
		const response = await axios.get(`${apiUrl_user}/get-security-question`);
		setSecurityQuestion(response.data);
	}, []);

	const handleRegisterBtn = () => {
		if (
			username === "" ||
			password === "" ||
			email === "" ||
			name === "" ||
			securityAnswer === "" ||
			!policyCheck
		) {
			return Swal.fire({
				icon: "warning",
				title: "Ooopss..",
				text: "Make sure all fields are filled in correctly",
			});
		}

		if (cpassword !== password)
			return Swal.fire({
				icon: "warning",
				title: "Ooopss..",
				text: "Password doesn't match'",
			});

		const payload = {
			username,
			email,
			password,
			full_name: name,
			security_answer: securityAnswer,
			security_question_id: securityQuestionId,
		};

		dispatch(authRegisterAction(payload));
	};
	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: "rgba(244, 246, 255,0.5)",
				justifyContent: "center",
				display: "flex",
				alignItems: "center",
				zIndex: 2,
				order: 2,
			}}
		>
			<div
				style={{
					height: "650px",
					width: "60%",
					display: "flex",
					borderRadius: "20px",
					boxShadow: "0 0 5px 1px rgba(0,0,0,0.5)",
				}}
			>
				<div
					style={{
						backgroundColor: surfaceColor,
						width: "40%",
						borderTopLeftRadius: 20,
						borderBottomLeftRadius: 20,
						justifyContent: "center",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div className="mb-5">
						<img
							src="https://i.imgur.com/69bOytv.png"
							alt="file_err"
							width="auto"
							height="300"
						/>
					</div>
					<div>
						<Link to="/login">
							<Button style={{ backgroundColor: primaryColor, borderWidth: 0 }}>
								<div style={{ color: "black" }}>Have an account</div>
							</Button>
						</Link>
					</div>
				</div>
				<div
					style={{
						backgroundColor: primaryColor,
						width: "60%",
						borderTopRightRadius: 20,
						borderBottomRightRadius: 20,
						paddingInline: 50,
						paddingBlock: 30,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<div className="d-flex justify-content-center pb-4">
						<div
							style={{
								fontSize: "1.5em",
								fontWeight: "bold",
								textTransform: "uppercase",
							}}
						>
							create account
						</div>
					</div>
					<div>
						<Form onSubmit={handleRegisterBtn}>
							<FormGroup>
								<Label>Full Name</Label>
								<Input
									type="text"
									placeholder="your name"
									onChange={(e) => setName(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Security Question</Label>
								<div className="d-flex justify-content-between">
									<div style={{ width: "49%" }}>
										<Select
											options={securityQuestion}
											defaultValue={{
												label: "Siapa nama hewan peliharaan pertama Anda?",
												value: 1,
											}}
											onChange={(e) => setSecurityQuestionId(e.value)}
										/>
									</div>
									<div style={{ width: "49%" }}>
										<Input
											type="text"
											placeholder="anwser"
											onChange={(e) => setSecurityAnswer(e.target.value)}
										/>
									</div>
								</div>
							</FormGroup>
							<FormGroup>
								<Label>Username</Label>
								<Input
									type="text"
									placeholder="username"
									onChange={(e) => setUsername(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Email</Label>
								<Input
									type="email"
									placeholder="email@gmail.com"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormGroup>
							<div className="d-flex justify-content-between">
								<FormGroup style={{ width: "49%" }}>
									<Label>Password</Label>
									<Input
										type="password"
										placeholder="password"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</FormGroup>
								<FormGroup style={{ width: "49%" }}>
									<Label>Confirm Password</Label>
									<Input
										type="password"
										placeholder="retype password"
										onChange={(e) => setCPassword(e.target.value)}
									/>
								</FormGroup>
							</div>
							<div style={{ paddingInline: 20 }}>
								<Label>
									<Input
										type="checkbox"
										onChange={() => setPolicyCheck(!policyCheck)}
									/>
									<div>
										I agree to the
										<a href="#" target="_blank">
											Terms and Conditions
										</a>
									</div>
								</Label>
							</div>
							<div className="d-flex justify-content-center mt-3">
								<Button
									disabled={isLoading}
									onClick={handleRegisterBtn}
									style={{
										backgroundColor: surfaceColor,
										borderWidth: 0,
										width: "50%",
									}}
								>
									{isLoading ? (
										<Loader
											type="ThreeDots"
											color="white"
											height="auto"
											width={50}
										/>
									) : (
										<div>Register</div>
									)}
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
