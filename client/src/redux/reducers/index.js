import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { adminReducer } from "./adminReducer";

export default combineReducers({
  authReducer,
  productReducer,
  cartReducer,
  adminReducer,
});
