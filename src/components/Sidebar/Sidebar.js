import React, { Component } from "react";

import Button from "../UI/Button/Button";
import Checkbox from "../UI/Checkbox/Checkbox";
import Input from "../UI/Input/Input";
import Radio from "../UI/Radio/Readio";
import Select from "../UI/Select/Select";
import Textarea from "../UI/Textarea/Textarea";

import "./Sidebar.css";

export default class Sidebar extends Component {
  render() {
    const { droppedElement } = this.props;

    return (
      <div className="sidebar-container">
        <div className="sidebar-items">
          {!droppedElement.includes("input") && <Input />}
          {!droppedElement.includes("button") && <Button />}
          {!droppedElement.includes("textarea") && <Textarea />}
          {!droppedElement.includes("checkbox") && <Checkbox />}
          {!droppedElement.includes("select") && <Select />}
          {!droppedElement.includes("radio") && <Radio />}
        </div>
      </div>
    );
  }
}
