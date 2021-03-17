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
  id: null,
  errorMessage: '',
  email: '',
  name: '',
  username: '',
  imagepath: '',
  phone: null,
  roleId: null,
  emailVerificationId: null,
  userStatusId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_LOADING_START:
      return { ...state, isLoading: true };
    case API_LOADING_SUCCESS:
      return { ...state, isLoading: false, ...action.payload };
    case API_LOADING_ERROR:
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
    case NULLIFY_ERROR:
      return { ...state, isError: false, errorMessage: null };
    case AUTH_SIGN:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.full_name,
        username: action.payload.username,
        imagepath: action.payload.imagepath,
        phone: action.payload.phone,
        roleId: action.payload.role_id,
        emailVerificationId: action.payload.emai_verification_id,
        userStatusId: action.payload.user_status_id,
      };
    default:
      return state;
  }
};

export { authReducer };
