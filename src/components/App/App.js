import React, { Component } from "react";
import Main from "../Main";
import Sidebar from "../Sidebar";

import "./App.css";

export default class App extends Component {
  state = {
    droppedElement: [],
    selectedElement: "",
  };

  onDropped(element) {
    this.setState(({ droppedElement }) => ({
      droppedElement: [...droppedElement, element],
    }));
  }

  onSelect(element) {
    this.setState({ selectedElement: element });
  }

  render() {
    return (
      <div className="app">
        <div className="app-container">
          <Sidebar
            onSelect={element => this.onSelect(element)}
            droppedElement={this.state.droppedElement}
          />
          <Main
            onDropped={el => this.onDropped(el)}
            droppedElement={this.state.droppedElement}
            selectedElement={this.state.selectedElement}
          />
        </div>
      </div>
    );
  }
}
