import React, { Component } from "react";
import { Error404Page } from "tabler-react";
import SiteWrapper from "./SiteWrapper";

class NoMatch extends Component {
  render() {
    return (
      <SiteWrapper>
        <Error404Page />
      </SiteWrapper>
    );
  }
}
export default NoMatch;
