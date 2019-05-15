import React, { Component } from "react";
import ProductMockup from "../common/ProductMockup";
import Loader from "../common/Loader";
import logo from "../../assets/images/logo-text.png"
import {Link} from "react-router-dom";
class Landing extends Component {
  componentDidMount() {
    const { company, product } = this.props.match.params;
    if (company && product) {
      this.props.fetchLanding(company, product);
    }
  }
  renderDashBoard() {
    const { landingData, subscribe, showLoader, submitSuccess } = this.props;
    if (landingData === null) {
      return <Loader />;
    } else if (landingData === "false") {
      return "Something went wrong";
    } else {
      return (
        <div>
          {showLoader && <Loader />}

          <ProductMockup
            successOverlay={submitSuccess}
            title={landingData.products[0].title}
            description={landingData.products[0].description}
            cover={`https://s3.amazonaws.com/mailslot/${
              landingData.products[0].cover
            }`}
            logo={`https://s3.amazonaws.com/mailslot/${landingData.logo}`}
            brandColor={landingData.brandColor}
            onSubmit={subscribe}
            disableEmail={false}
            initialValues={{
              email: null,
              productId: landingData.products[0]._id
            }}
          />
          <div className="powered-by-wrapper">
          <span className="powered-by">Powered by</span>
          <Link to={"/"} className="powered-by-logo">{<img src={logo}/>}</Link>
          </div>
        </div>
      );
    }
  }
  render() {
    return <div className="landing-wrapper">{this.renderDashBoard()}</div>;
  }
}

export default Landing;
