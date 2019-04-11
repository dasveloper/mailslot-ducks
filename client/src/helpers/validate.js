const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.listName) {
    errors.listName = "Please enter a name for your contact list";
  }

  if (!values.sex) {
    errors.sex = "Required";
  }
  if (!values.favoriteColor) {
    errors.favoriteColor = "Required";
  }
  //Login Form
  if (!values.loginEmail) {
    errors.loginEmail = "Please enter your email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.loginEmail)
  ) {
    errors.loginEmail = "Invalid email address";
  }
  if (!values.loginPassword) {
    errors.loginPassword = "Please enter a password";
  }
  //Respond form

  if (!values.responsePhone) {
    errors.responsePhone = "Please enter your phone number";
  } else if (!/^(0|[1-9][0-9]{9})$/i.test(values.responsePhone)) {
    errors.responsePhone = "Invalid phone number, must be 10 digits";
  }
  if (!values.responseName) {
    errors.responseName = "Please enter your name";
  }
  if (!values.responseAddress) {
    errors.responseAddress = "Please enter your address";
  }
  if (!values.responseEmail) {
    errors.responseEmail = "Please enter your email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.responseEmail)
  ) {
    errors.responseEmail = "Invalid email address";
  }

  //Register Form
  if (!values.registerFirstName) {
    errors.registerFirstName = "Please enter your first name";
  }
  if (!values.registerLastName) {
    errors.registerLastName = "Please enter your last name";
  }
  if (!values.registerEmail) {
    errors.registerEmail = "Please enter your email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.registerEmail)
  ) {
    errors.registerEmail = "Invalid email address";
  }
  if (!values.registerPassword) {
    errors.registerPassword = "Please enter a password";
  }
  if (!values.registerConfirmPassword) {
    errors.registerConfirmPassword = "Please confirm your password";
  }
  if (
    values.registerPassword &&
    values.registerConfirmPassword &&
    values.registerPassword !== values.registerConfirmPassword
  ) {
    errors.registerConfirmPassword = "Passwords do not match";
  }
  return errors;
};

export default validate;
