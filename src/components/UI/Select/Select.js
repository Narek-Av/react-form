import React, { Component } from "react";

import "./Select.css";

export default class Select extends Component {
  handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("type/element", "select");

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
        className={`select${active ? " active" : ""}`}
        draggable={!active}
        onDragStart={e => this.handleDragStart(e)}
        onDragEnd={e => this.handleDragEnd(e)}
      >
        <select>
          <option>Select</option>
        </select>
      </div>
    );
  }
}
