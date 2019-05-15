
import { connect } from "react-redux";
import EditProductFormComponent from "./EditProductFormComponent";

import { editProductOperations } from "./duck";
import { formValueSelector } from "redux-form"; // ES6
const selector = formValueSelector("edit-product");

const mapStateToProps = state => {
    return {
      cover: selector(state, "cover"),
      productFile: selector(state, "productFile")
    };
  };
const mapDispatchToProps = dispatch => {
  const editProduct = values => {
    console.log(values);
    return dispatch(editProductOperations.editProduct(values));
  };

  return { onSubmit:  editProduct };
};

const EditProductFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProductFormComponent);

export default EditProductFormContainer;
