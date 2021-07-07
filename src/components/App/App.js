import React, { Component } from "react";
import Main from "../Main";
import Sidebar from "../Sidebar";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-container">
          <Sidebar />
          <Main />
        </div>
      </div>
    );
  }
}
