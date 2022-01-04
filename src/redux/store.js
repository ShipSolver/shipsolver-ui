import { combineReducers, createStore, applyMiddleware } from "redux";
import AuthenticationReducer from "./reducers/authenticationReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authentication: AuthenticationReducer
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
