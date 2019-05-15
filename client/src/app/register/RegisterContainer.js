
import { connect } from 'react-redux';
import { registerOperations } from './duck';
import RegisterComponent from './RegisterComponent';
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

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent);

export default RegisterContainer;
