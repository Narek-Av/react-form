import React, { Component } from "react";

import "./Checkbox.css";

export default class Checkbox extends Component {
  handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("type/element", "checkbox");

    setTimeout(() => {
      e.target.classList.add("hiden");
    }, 0);
  }

  handleDragEnd(e) {
    e.target.classList.remove("hiden");
  }

  render() {
    const { active } = this.props;

    return (
      <div
        className={`checkbox${active ? " active" : ""}`}
        draggable={!active}
        onDragStart={e => this.handleDragStart(e)}
        onDragEnd={e => this.handleDragEnd(e)}
      >
        <input type="checkbox" />
      </div>
    );
  }
}
