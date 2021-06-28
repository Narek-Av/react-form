import React, { Component } from "react";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Checkbox from "../UI/Checkbox/Checkbox";
import Radio from "../UI/Radio/Readio";
import Select from "../UI/Select/Select";
import Textarea from "../UI/Textarea/Textarea";

import "./Main.css";

export default class Main extends Component {
  state = {
    freePosition: ["center"],
    selectedPosition: ["center"],
    positions: ["center", "top", "right", "bottom", "left"],
  };

  handleDragOver(e) {
    e.preventDefault();
    if (this.state.selectedPosition.length === 2) return;
    e.target.closest(".draging-box").classList.add("over");
    return false;
  }

  clearOver(e) {
    e.target.closest(".draging-box").classList.remove("over");
  }

  handleDrop(e) {
    e.stopPropagation();
    e.target.closest(".draging-box").classList.remove("over");
    if (this.state.selectedPosition.length === 2) return;

    const droppedElement = e.dataTransfer.getData("type/element");

    const { onDropped } = this.props;
    const position = e.target.dataset.position;

    this.setState(({ freePosition, selectedPosition }) => ({
      freePosition:
        position === "center"
          ? ["top", "left", "bottom", "right"]
          : [...freePosition, position],
      selectedPosition:
        position === "center"
          ? selectedPosition
          : [...selectedPosition, position],
    }));

    onDropped(droppedElement);

    return false;
  }

  renderList(droppedElement) {
    const { selectedPosition } = this.state;

    return droppedElement.map((element, index) => {
      return (
        <div className={`draging-box-${selectedPosition[index]}`} key={index}>
          {element === "input" && <Input active={true} />}
          {element === "button" && <Button active={true} />}
          {element === "checkbox" && <Checkbox active={true} />}
          {element === "textarea" && <Textarea active={true} />}
          {element === "select" && <Select active={true} />}
          {element === "radio" && <Radio active={true} />}
        </div>
      );
    });
  }

  renderPositionsBox(freePosition, positions) {
    return positions.map(position => {
      return freePosition.includes(position) ? (
        <div
          key={position}
          className={`draging-box-${position} active`}
          onDrop={e => this.handleDrop(e)}
          onDragOver={e => e.target.classList.add("select")}
          onDragLeave={e => e.target.classList.remove("select")}
          data-position={position}
        />
      ) : undefined;
    });
  }

  render() {
    const { droppedElement } = this.props;
    const { freePosition, positions, selectedPosition } = this.state;

    return (
      <div className="main-container">
        <div
          className={`draging-box ${selectedPosition[1]}`}
          onDragOver={e => this.handleDragOver(e)}
          onDragLeave={e => this.clearOver(e)}
          onDrop={e => this.clearOver(e)}
        >
          {selectedPosition.length < 2 &&
            this.renderPositionsBox(freePosition, positions)}
          {this.renderList(droppedElement)}
        </div>
      </div>
    );
  }
}
