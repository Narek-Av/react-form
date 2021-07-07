import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MainNavigation extends Component {
  render() {
    return (
      <div className="main-navigation">
        {this.props.pathname === "/" ? (
          <Link to="/code" className="btn">
            Code
          </Link>
        ) : (
          <Link to="/" className="btn">
            Form
          </Link>
        )}
      </div>
    );
  }
}
