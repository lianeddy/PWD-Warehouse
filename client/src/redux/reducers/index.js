import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { adminReducer } from "./adminReducer";

export default combineReducers({
	authReducer,
	productReducer,
	adminReducer,
});
