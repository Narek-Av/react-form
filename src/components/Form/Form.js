import React, { Component } from "react";
// import { transformHtmlToReact } from "../../helpers";

import Modal from "../UI/Modal";

import "./Form.css";

export default class Form extends Component {
  state = {
    freePosition: ["center"],
    selectedPosition: [],
    droppedElement: {},
    selectedElement: null,
    formTree: "",
    columnsCount: 1,
    rowsCount: 0,
  };

  componentDidUpdate(_, prevState) {
    const { formTree } = this.state;

    if (prevState.droppedElement !== this.state.droppedElement) {
      this.renderTree();
    }

    if (prevState.formTree !== formTree) {
      this.props.transformData(<div className="form-wrapper">{formTree}</div>);
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    e.target.closest(".draging-box").classList.add("over");
    return false;
  }

  clearOver(e) {
    e.target.closest(".draging-box").classList.remove("over");
  }

  handleDrop(e) {
    e.stopPropagation();
    e.target.closest(".draging-box").classList.remove("over");
    e.target.classList.remove("select");

    const droppedElement = e.dataTransfer.getData("type/element");
    this.setState({ droppedElement: { name: droppedElement } });

    const position = e.target.dataset.position;

    this.setState(
      ({ freePosition, selectedPosition, columnsCount, rowsCount }) => ({
        freePosition:
          position === "center"
            ? ["top", "left", "bottom", "right"]
            : columnsCount > 2
            ? ["top", "bottom"]
            : freePosition,
        selectedPosition:
          position !== "center" ? [...selectedPosition, position] : [],
        columnsCount:
          position === "left" || position === "right"
            ? columnsCount + 1
            : columnsCount,
        rowsCount:
          position === "top" || position === "bottom"
            ? rowsCount + 1
            : rowsCount,
      })
    );

    return false;
  }

  positioningFormWrapper() {
    const { columnsCount, rowsCount } = this.state;

    return {
      display: "grid",
      color: "blue",
      gridTemplateColumns: `repeat(${columnsCount}, minmax(100px, 1fr))`,
      gridTemplateRows: `repeat(${rowsCount}, 50px)`,
      gridGap: "15px",
    };
  }

  renderTree() {
    const { name } = this.state.droppedElement;
    const id = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 7);

    const element = () => {
      switch (name) {
        case "input":
          return <input placeholder="Input" />;
        case "textarea":
          return <textarea placeholder="Textarea" />;
        case "checkbox":
          return <input type="checkbox" />;
        case "radio":
          return <input type="radio" />;
        case "button":
          return <button>Button</button>;
        case "select":
          return (
            <select>
              <option>Select</option>
            </select>
          );
        default:
          throw new Error("Unexception type ", element);
      }
    };

    const formElement = (
      <div className="form-control" id={id} key={id}>
        <button
          className="btn add-btn"
          ignore="ignore"
          onClick={e =>
            this.setState({ selectedElement: e.target.parentElement })
          }
        >
          +
        </button>
        {element()}
      </div>
    );

    this.setState(({ formTree }) => ({ formTree: [...formTree, formElement] }));
  }

  updateTree(element) {
    // const updatedElement = transformHtmlToReact(element);
    // this.setState(({ formTree }) => ({
    //   formTree: [
    //     ...formTree.filter(el => el.key !== element.id),
    //     updatedElement,
    //   ],
    // }));
  }

  render() {
    const { freePosition, formTree, selectedElement } = this.state;
    const positions = ["center", "top", "right", "bottom", "left"];

    return (
      <div
        className="draging-box"
        onDragOver={e => this.handleDragOver(e)}
        onDragLeave={e => this.clearOver(e)}
        onDrop={e => this.clearOver(e)}
      >
        {positions.map(
          position =>
            freePosition.includes(position) && (
              <div
                key={position}
                className={`draging-box-${position} active`}
                onDrop={e => this.handleDrop(e)}
                onDragOver={e => e.target.classList.add("select")}
                onDragLeave={e => e.target.classList.remove("select")}
                data-position={position}
              />
            )
        )}
        {formTree && (
          <div style={this.positioningFormWrapper()} className="form-wrapper">
            {formTree}
          </div>
        )}
        {selectedElement && (
          <Modal
            element={selectedElement}
            closeModal={() => this.setState({ selectedElement: null })}
            updateElement={this.updateTree.bind(this)}
          />
        )}
      </div>
    );
  }
}
