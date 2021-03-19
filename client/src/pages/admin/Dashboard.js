import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { LoginPage } from "../index";
import { LoaderPage } from "../../components";
import { AUTH_LOGOUT } from "../../redux/types";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
	const dispatch = useDispatch();
	const { roleId, isLogin, isLoading } = useSelector(
		(state) => state.authReducer
	);
	if (isLoading) return <LoaderPage />;
	if (!isLogin) return <Redirect to="/products" />;

	return (
		<div>
			<div>home</div>
			<Button color="primary" onClick={() => dispatch({ type: AUTH_LOGOUT })}>
				logout
			</Button>
		</div>
	);
};

export default Dashboard;
