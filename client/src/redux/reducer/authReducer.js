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
    case "API_LOADING_START":
      return {
        ...state,
        isLoading: true
      }
    case "API_LOADING_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isLoading: false
    }
    case "API_LOADING_ERROR":
      return {
        ...state,
        errorMessage: action.payload ,
        isError: true,
        isLoading: false
      }
    case "NULLIFY_ERROR":
      return {
        ...state,
        errorMessage: "",
        isError: false
      }
    case "NULLIFY_ALL":
      return INITIAL_STATE
    default:
      return INITIAL_STATE
    }
};

export { authReducer };
