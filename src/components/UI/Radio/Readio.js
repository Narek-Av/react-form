import React, { Component } from "react";

import "./Radio.css";

export default class Radio extends Component {
  state = {
    showModal: false,
  };

  handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("type/element", "radio");

    setTimeout(() => {
      e.target.className = "hiden";
    }, 0);
  }

  handleDragEnd(e) {
    e.target.className = "radio";
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
