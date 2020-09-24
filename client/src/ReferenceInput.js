import React, { Component } from "react";
import { Input } from "@material-ui/core";

export default class ReferenceInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      contact: "",
    };
  }

  render() {
    const { name, contact } = this.state;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ height: 10 }}></div>

        <Input
          value={name}
          onChange={(word) => this.update(word.target.value, "name")}
          placeholder="Full escort name"
          style={{ width: 260, fontSize: 18 }}
        />

        <div style={{ height: 10 }}></div>

        <Input
          value={contact}
          onChange={(word) => this.update(word.target.value, "contact")}
          placeholder="Contact"
          style={{ width: 260, fontSize: 18 }}
        />
      </div>
    );
  }

  update(word, type) {
    const { updateState } = this.props;
    const { name, contact } = this.state;
    this.setState({
      [type]: word,
    });

    if (type === "name") {
      updateState({ name: word, contact: contact });
    } else {
      updateState({ name: name, contact: word });
    }
  }
}
