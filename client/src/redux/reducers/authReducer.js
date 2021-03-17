import {API_LOADING_SUCCESS, API_LOADING_START, API_LOADING_ERROR, NULLIFY_ERROR, RESET_INITIAL_STATE, REGISTERED_TRUE, CHANGE_PERMITTED} from "../types"

const INITIAL_STATE = {
  id: null,
  email: "",
  security_question: "",
  changePermitted: false,
  passwordChanged: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_LOADING_START:
      return {
        ...state,
        isLoading: true
      }
    case API_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false
    }
    case API_LOADING_ERROR:
      return {
        ...state,
        errorMessage: action.payload ,
        isError: true,
        isLoading: false
      }
    case NULLIFY_ERROR:
      return {
        ...state,
        errorMessage: "",
        isError: false
      }
    case REGISTERED_TRUE:
      return {
        ...state,
        ...action.payload
      }
    case CHANGE_PERMITTED:
      return {
        ...state,
        changePermitted: true
      }
    case RESET_INITIAL_STATE:
      return INITIAL_STATE
    default:
      return state
    }
};

export { authReducer };
