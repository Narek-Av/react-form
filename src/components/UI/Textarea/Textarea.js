import React, { Component } from "react";

import "./Textarea.css";

export default class Textarea extends Component {
  handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("type/element", "textarea");

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
        className={`textarea${active ? " active" : ""}`}
        draggable={!active}
        onDragStart={e => this.handleDragStart(e)}
        onDragEnd={e => this.handleDragEnd(e)}
      >
        <textarea placeholder="Textarea"></textarea>
      </div>
    );
  }
}
