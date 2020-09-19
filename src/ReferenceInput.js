import React, { Component } from "react";
import { Input } from "@material-ui/core";

export default class ReferenceInput extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ height: 10 }}></div>

        <Input
          onChange={(word) =>
            this.setState({
              employerCity: word.target.value,
            })
          }
          placeholder="Name"
          style={{ width: 260 }}
        />
        <div style={{ height: 10 }}></div>

        <Input
          onChange={(word) =>
            this.setState({
              employerCity: word.target.value,
            })
          }
          placeholder="Online profile (Eros, etc.)"
          style={{ width: 260 }}
        />
        <div style={{ height: 10 }}></div>

        <Input
          onChange={(word) =>
            this.setState({
              employerCity: word.target.value,
            })
          }
          placeholder="Contact"
          style={{ width: 260 }}
        />
      </div>
    );
  }
}
