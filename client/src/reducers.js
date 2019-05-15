import { combineReducers } from 'redux';
import  loginReducer  from './app/login/duck/index';
import  registerReducer  from './app/register/duck/index';
import  profileReducer  from './app/profile/duck/index'

import { reducer as formReducer } from "redux-form";
import appReducer from './app/duck';
import landingReducer from './app/landing/duck';
import dashboardReducer from './app/dashboard/duck';
import productReducer from './app/product/duck';
import editProductReducer from './app/editProduct/duck';

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  landing: landingReducer,
  dashboard: dashboardReducer,
  product: productReducer,
  editProduct: editProductReducer,
  form: formReducer
});

export default rootReducer;