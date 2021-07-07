import React, { Component } from "react";

import "./Button.css";

export default class Button extends Component {
  handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("type/element", "button");

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
        className={`button${active ? " active" : ""}`}
        draggable={!active}
        onDragStart={e => this.handleDragStart(e)}
        onDragEnd={e => this.handleDragEnd(e)}
      >
        <button>Button</button>
      </div>
    );
  }
}
