import { connect } from "react-redux";
import { editProductOperations } from "./duck";
import EditProductComponent from "./EditProductComponent";
import {getFormValues} from 'redux-form';

function mapStateToProps(state) {
  const { account} = state.app;
  const {showLoader, product} = state.editProduct;

  return {
    account,
    showLoader,
    product,
    editProductForm: getFormValues("edit-product")(state)
  };
}

const mapDispatchToProps = dispatch => {
  const fetchProduct = (company, product) => {

    dispatch(editProductOperations.fetchProduct(company, product));
  };

  return { fetchProduct };
};
const EditProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProductComponent);

export default EditProductContainer;
