import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import {
	ProductPage,
	ChangePasswordPage,
	ForgetPasswordPage,
	RedirectPage,
	CartPage,
} from "./pages/user";
import { LoginPage, RegisterPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
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
			<Route path="/" exact component={ProductPage} />
			<Route path="/product" component={ProductPage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/register" component={RegisterPage} />
			<Route path="/forget-password" component={ForgetPasswordPage} />
			<Route path="/change-password" component={ChangePasswordPage} />
			<Route path="/redirect" component={RedirectPage} />
			<Route path="/cart" component={CartPage} />
		</div>
	);
};

export default App;
