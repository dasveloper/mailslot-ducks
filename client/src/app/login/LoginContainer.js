
import { connect } from 'react-redux';
import { loginOperations } from './duck';
import LoginComponent from './LoginComponent';
import { history } from "../App";


const mapStateToProps = state => {
  const { account } = state.app;
   if (!!account && !!account.companyName){
    history.push('/dashboard');
   } 
   else if (!!account){
    history.push('/updateProfile');

   }
};

const mapDispatchToProps = dispatch => {

  return {
  
  }
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default LoginContainer;
