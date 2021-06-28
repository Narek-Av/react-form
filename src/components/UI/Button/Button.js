import React, { Component } from "react";

import "./Button.css";

export default class Button extends Component {
  state = {
    showModal: false,
  };

  handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("type/element", "button");

    setTimeout(() => {
      e.target.className = "hiden";
    }, 0);
  }

  handleDragEnd(e) {
    e.target.className = "button";
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
        {active && (
          <button
            className="add-btn"
            onClick={() => this.setState({ showModal: true })}
          >
            +
          </button>
        )}
        {this.state.showModal && (
          <div className="modal">
            <div className="backdrop" />
            <div className="modal-content">
              <h2>Add Attributes</h2>
              <div className="modal-buttons">
                <button onClick={() => this.setState({ showModal: false })}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
