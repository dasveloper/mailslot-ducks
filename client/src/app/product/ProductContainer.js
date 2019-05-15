import { connect } from "react-redux";
import { productOperations } from "./duck";
import ProductComponent from "./ProductComponent";
import {getFormValues} from 'redux-form';

function mapStateToProps(state) {
  const { account} = state.app;
  const {showLoader, product} = state.product;

  return {
    account,
    showLoader,
    product,
    productForm: getFormValues("add-product")(state)
  };
}

const mapDispatchToProps = dispatch => {
  const fetchProduct = (company, product) => {

    dispatch(productOperations.fetchProduct(company, product));
  };

  return { fetchProduct };
};
const ProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComponent);

export default ProductContainer;
