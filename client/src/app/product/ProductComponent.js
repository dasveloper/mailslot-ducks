import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import ProductFormContainer from "./ProductFormContainer";
import ProductMockup from "../common/ProductMockup";
import Loader from "../common/Loader";

import { getFormValues } from "redux-form";

class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverPreviewUrl: null
    };
  }
  componentDidMount() {
    const {product } = this.props.match.params;
    const {account } = this.props;
    if (product) {
      this.props.fetchProduct(account.companyName, product);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.productForm !== prevProps.productForm) {
      const { cover } = this.props.productForm;
      console.log(typeof(cover));
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          coverPreviewUrl: reader.result
        });
      };
      if (!!cover && typeof(cover) === 'object') reader.readAsDataURL(cover[0]);
    }
  }
  renderProductComponent() {
    const { createProduct, productForm, account, showLoader, product } = this.props;
    const { coverPreviewUrl } = this.state;

    return (
      <div className="register-wrapper">
        {showLoader && <Loader />}

        <div className="register-left">
          <h1 className="register-header">Create your company profile</h1>

          <ProductFormContainer initialValues={{...product}} onSubmit={createProduct} />
        </div>
        <div className="register-right">
          {productForm && (
            <ProductMockup
              title={productForm.title}
              description={productForm.description}
              cover={coverPreviewUrl}
              logo={`https://s3.amazonaws.com/mailslot/${account.logo}`}
              brandColor={account.brandColor}
            />
          )}
        </div>
      </div>
    );
  }
  render() {
    return this.renderProductComponent();
  }
}

export default ProductComponent;
