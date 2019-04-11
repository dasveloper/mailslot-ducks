import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";


const PageNotFound = props => {
  return (
    <div className="container-inner center">
      <Card fluid className="card-wrapper" raised>
      <div className="card-inner">

        <div className="card-row row-spacing">
          <h2>
            <span>404</span> page not found
          </h2>
        </div>
        <div className="card-row">
          <Button
            as={Link}
            to={"/create"}
            className="card-button"
            fluid
            size="large"
          >
            Create a contact list
          </Button>
        </div>
        <div className="card-row">
          <Button
            as={Link}
            to={"/dashboard"}
            className="card-button"
            fluid
            size="large"
          >
            Go to your dashboard
          </Button>
        </div>
        </div>
      </Card>
    </div>
  );
};

export default PageNotFound;
