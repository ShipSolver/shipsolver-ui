import {
  SET_USER,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_ERROR,
} from "../actionTypes/authenticationActionTypes";

export const setUser = (user) => ({
  type: SET_USER,
  user,
});
export const setLoading = (loading) => ({
  type: SET_AUTHENTICATION_LOADING,
  loading,
});

export const setError = (error) => ({
  type: SET_AUTHENTICATION_ERROR,
  error,
});
