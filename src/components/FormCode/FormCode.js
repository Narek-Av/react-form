import React, { Component } from "react";

import "./FormCode.css";

export default class FormCode extends Component {
  setAttributes(el, attrs) {
    if (!attrs) return;

    for (let [key, val] of Object.entries(attrs)) {
      el.setAttribute(key, val);
    }
  }

  createTree(el) {
    const { type, attrs, children } = el;
    const element = document.createElement(type);

    this.setAttributes(element, attrs);

    if (!children) return element;

    if (typeof children === "string") {
      const el = document.createTextNode(children);
      element.appendChild(el);
    } else {
      children.forEach(child => {
        if (!child) return;

        let childrenElement =
          typeof child !== "string"
            ? this.createTree(child)
            : document.createTextNode(child);
        element.appendChild(childrenElement);
      });
    }

    return element;
  }

  render() {
    const { htmlCode } = this.props;

    return (
      <div className="form-code">
        {htmlCode && <pre>{this.createTree(htmlCode).outerHTML}</pre>}
      </div>
    );
  }
}
