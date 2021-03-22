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
  DetailProductPage,
  EmailRedirectPage,
} from "./pages/user";
import { LoginPage, RegisterPage } from "./pages";
import { useDispatch } from "react-redux";
import { keepLoginAction } from "./redux/actions";
import { Dashboard } from "./pages/admin";
import { Header } from "./components";

const App = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(keepLoginAction());
  }, []);
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(keepLoginAction());
  }

  return (
    <div>
      <Header />
      <Route path="/" exact component={ProductPage} />
      <Route path="/products" component={ProductPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forget-password" component={ForgetPasswordPage} />
      <Route path="/change-password" component={ChangePasswordPage} />
      <Route path="/redirect" component={RedirectPage} />
      <Route path="/email-verification" component={EmailRedirectPage} />
      <Route path="/admin" component={Dashboard} />
      <Route path="/cart" component={CartPage} />
      <Route path="/detail" component={DetailProductPage} />
    </div>
  );
};

export default App;
