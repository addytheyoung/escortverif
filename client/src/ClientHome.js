import React, { Component } from "react";
import Header from "./Header";

export default class ClientHome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div>Client home</div>
      </div>
    );
  }
}
