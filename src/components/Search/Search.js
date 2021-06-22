import React, { Component } from "react";

import "./Search.css";

export default class Search extends Component {
  onChangeHandler(e) {
    const value = e.target.value;
    this.props.searchPost(value.toLowerCase());
  }

  render() {
    return (
      <div className="search-content">
        <input
          onChange={e => this.onChangeHandler(e)}
          type="text"
          placeholder="Search"
        />
      </div>
    );
  }
}
