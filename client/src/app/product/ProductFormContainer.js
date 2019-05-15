
import { connect } from "react-redux";
import ProductFormComponent from "./ProductFormComponent";

import { productOperations } from "./duck";
import { formValueSelector } from "redux-form"; // ES6
const selector = formValueSelector("add-product");

const mapStateToProps = state => {
    return {
      cover: selector(state, "cover"),
      productFile: selector(state, "productFile")
    };
  };
const mapDispatchToProps = dispatch => {
  const addProduct = values => {
    return dispatch(productOperations.addProduct(values));
  };

  return { onSubmit:  addProduct };
};

const ProductFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductFormComponent);

export default ProductFormContainer;
