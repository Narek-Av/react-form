import React, { Component } from "react";

export default class ToggleButtons extends Component {
  onClickHandler() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    return (
      <div className="show-column">
        <button
          className="btn toggle-btn"
          onClick={() => this.onClickHandler()}
        >
          Go to Columns
        </button>
      </div>
    );
  }
}
