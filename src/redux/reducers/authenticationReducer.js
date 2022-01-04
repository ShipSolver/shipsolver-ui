import {
  SET_USER,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_ERROR,
} from "../actionTypes/authenticationActionTypes";

const defaultState = {
  user: null,
  loading: false,
  error: null,
};

const AuthReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_AUTHENTICATION_LOADING:
      return { ...state, loading: action.loading };
    case SET_AUTHENTICATION_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default AuthReducer;
