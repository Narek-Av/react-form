import React, { Component } from "react";

import "./Radio.css";

export default class Radio extends Component {
  handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("type/element", "radio");

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
        className={`radio${active ? " active" : ""}`}
        draggable={!active}
        onDragStart={e => this.handleDragStart(e)}
        onDragEnd={e => this.handleDragEnd(e)}
      >
        <input type="radio" />
      </div>
    );
  }
}
