import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import AddProductForm from "../components/AddProductForm";
import ProfileMockup from "../components/ProfileMockup";
import { createProduct } from "../actions/product";
import ProductMockup from "../components/ProductMockup";
import {getFormValues} from 'redux-form';

class Register extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    const { createProduct, product, user } = this.props;
    const { account } = user;

    console.log(account);
    return (
      <div className="register-wrapper">
        <div className="register-left">
        <h1 className="register-header">Create your company profile</h1>

          <AddProductForm onSubmit={createProduct} />
        </div>
        <div className="register-right">
          {account  && <ProductMockup {...product} logo={account.logo} brandColor={account.brandColor} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: getFormValues('addproduct')(state),
    user: state.user
  };
}
const mapDispatchToProps = {
    createProduct
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
