import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import EditProductFormContainer from "./EditProductFormContainer";
import ProductMockup from "../common/ProductMockup";
import Loader from "../common/Loader";

import { getFormValues } from "redux-form";

class EditProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverPreviewUrl: null
    };
  }
  componentDidMount() {
    const { product } = this.props.match.params;
    const { account } = this.props;
    if (product) {
      this.props.fetchProduct(account.companyName, product);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.editProductForm !== prevProps.editProductForm) {
      const { cover } = this.props.editProductForm || {};
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          coverPreviewUrl: reader.result
        });
      };
      if (!!cover && typeof(cover) === 'object') reader.readAsDataURL(cover[0]);
    }
  }
  renderEditProductComponent() {
    const {
      createProduct,
      editProductForm,
      account,
      showLoader,
      product
    } = this.props;
    const { coverPreviewUrl } = this.state;

    return (
      <div className="register-wrapper">
        {showLoader && <Loader />}

        <div className="register-left">
          <h1 className="register-header">Create your company profile</h1>

          <EditProductFormContainer
            initialValues={product && { ...product.products[0] }}
            onSubmit={createProduct}
          />
        </div>
        <div className="register-right">
          {editProductForm && (
            <ProductMockup
              title={editProductForm.title}
              description={editProductForm.description}
              cover={coverPreviewUrl || (product && `https://s3.amazonaws.com/mailslot/${product.products[0].cover}`)}
              logo={`https://s3.amazonaws.com/mailslot/${account.logo}`}
              brandColor={account.brandColor}
            />
          )}
        </div>
      </div>
    );
  }
  render() {
    return this.renderEditProductComponent();
  }
}

export default EditProductComponent;
