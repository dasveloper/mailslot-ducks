import React from "react";
import { Link } from "react-router-dom";
import { Loader ,Dimmer} from "semantic-ui-react";


const LoaderWidget = props => {
  return (
    <Dimmer active inverted>
    <Loader inverted>Loading</Loader>
  </Dimmer>
  );
};

export default LoaderWidget;
