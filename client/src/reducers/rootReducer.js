import { combineReducers } from "redux";
import { fetchUser } from './authReducer';


import { reducer as formReducer } from "redux-form";

export default combineReducers({
  user: fetchUser,
  form: formReducer
});
