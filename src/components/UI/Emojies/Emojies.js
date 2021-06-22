import React, { Component } from "react";

import "./Emojies.css";
import emojies from "./emojies.json";

export default class Emojies extends Component {
  state = {
    emojies,
  };

  render() {
    const { emojies } = this.state;
    const { selectEmoji } = this.props;

    return (
      <div className="emojies-container">
        <ul className="emojies-list">
          {emojies.map((emoji, index) => (
            <li className="emojies-list-item" key={index}>
              <button
                type="button"
                className="emoji-btn"
                onClick={() => selectEmoji(String.fromCodePoint("0x" + emoji))}
              >
                {String.fromCodePoint("0x" + emoji)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
