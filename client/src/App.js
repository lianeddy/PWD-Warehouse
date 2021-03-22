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

  useEffect(() => {
    dispatch(keepLoginAction());
  }, []);

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
      <Route path="/cart" component={CartPage} />
      <Route path="/detail" component={DetailProductPage} />
    </div>
  );
};

export default App;
