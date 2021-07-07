import React, { Component } from "react";

import "./Modal.css";

export default class Modal extends Component {
  state = {
    labelName: "",
    labelId: "",
    otherAttributeName: "",
    otherAttributeValue: "",
    labelModal: "",
    attributeModal: "",
    warningItem: [],
    optionValue: "",
    optionName: "",
  };

  addAttributeToElement(element) {
    const {
      labelName,
      labelId,
      labelModal,
      attributeModal,
      otherAttributeName,
      otherAttributeValue,
    } = this.state;
    let validate = true;

    if (
      labelModal &&
      labelName.trim().length > 0 &&
      labelId.trim().length > 0
    ) {
      element.children[1].setAttribute("id", labelId);
      const label = document.createElement("label");
      label.innerText = labelName;
      label.htmlFor = labelId;
      element.appendChild(label);
    } else if (labelModal) {
      this.setState(({ warningItem }) => ({
        warningItem: [...warningItem, "label"],
      }));
      validate = false;
    }
    if (
      attributeModal &&
      otherAttributeName.trim().length > 0 &&
      otherAttributeValue.trim().length > 0
    ) {
      element.children[1].setAttribute(otherAttributeName, otherAttributeValue);
    } else if (attributeModal) {
      this.setState(({ warningItem }) => ({
        warningItem: [...warningItem, "attribute"],
      }));
      validate = false;
    }

    if (validate) {
      this.props.closeModal();
      this.props.updateElement(element);
    }
  }

  render() {
    const { element } = this.props;

    return (
      <div className="modal">
        <div className="backdrop" onClick={this.props.closeModal} />
        <div className="modal-container">
          <div className="modal-content">
            <h3>Add Attributes</h3>
            <div className="add-attributes">
              <div className="add-attributes-group">
                <button
                  className="btn-add btn-modal"
                  onClick={() =>
                    this.setState(({ labelModal }) => ({
                      labelModal: !labelModal,
                    }))
                  }
                >
                  Add Label
                </button>
                {this.state.labelModal && (
                  <div
                    className={`group-content${
                      this.state.warningItem.includes("label") ? " danger" : ""
                    }`}
                  >
                    Label Name:
                    <input
                      value={this.state.labelName}
                      onChange={e =>
                        this.setState({ labelName: e.target.value })
                      }
                    />
                    Label and Input Id:
                    <input
                      value={this.state.labelId}
                      onChange={e => this.setState({ labelId: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <div className="add-attributes-group">
                <button
                  className="btn-add btn-modal"
                  onClick={() =>
                    this.setState(({ attributeModal }) => ({
                      attributeModal: !attributeModal,
                    }))
                  }
                >
                  Add other Attribute
                </button>
                {this.state.attributeModal && (
                  <div
                    className={`group-content${
                      this.state.warningItem.includes("attribute")
                        ? " danger"
                        : ""
                    }`}
                  >
                    Attribute Name:
                    <input
                      value={this.state.otherAttributeName}
                      onChange={e =>
                        this.setState({ otherAttributeName: e.target.value })
                      }
                    />
                    Attribute Value:
                    <input
                      value={this.state.otherAttributeValue}
                      onChange={e =>
                        this.setState({ otherAttributeValue: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button className="btn-close" onClick={this.props.closeModal}>
              Close
            </button>
            <button
              className="btn-add"
              onClick={() => this.addAttributeToElement(element)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}
