import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/user";
import {
	ProductPage,
	ChangePasswordPage,
	ForgetPasswordPage,
	RedirectPage,
	EmailRedirectPage,
} from "./pages/user";
import { LoginPage, RegisterPage } from "./pages";
import { useDispatch } from "react-redux";
import { keepLoginAction } from "./redux/actions";

const App = () => {
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	if (token) {
		dispatch(keepLoginAction());
	}
	return (
		<div>
			<Header />
			<Route path="/products" exact component={ProductPage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/register" component={RegisterPage} />
			<Route path="/forget-password" component={ForgetPasswordPage} />
			<Route path="/change-password" component={ChangePasswordPage} />
			<Route path="/redirect" component={RedirectPage} />
			<Route path="/email-verification" component={EmailRedirectPage} />
		</div>
	);
};

export default App;
