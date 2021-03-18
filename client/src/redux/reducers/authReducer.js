import {
  API_LOADING_ERROR,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  AUTH_SIGN,
  NULLIFY_ERROR,
} from '../types';

const INITIAL_STATE = {
  isLoading: false,
  isLogin: false,
  isError: false,
  errorMessage: '',
  id: null,
  email: '',
  name: '',
  username: '',
  imagepath: '',
  phone: '',
  roleId: null,
  emailVerificationId: null,
  userStatusId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_LOADING_START:
      return { ...state, isLoading: true };
    case API_LOADING_SUCCESS:
      return { ...state, isLoading: false };
    case API_LOADING_ERROR:
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
    case NULLIFY_ERROR:
      return { ...state, isError: false, errorMessage: null };
    case AUTH_SIGN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export { authReducer };
