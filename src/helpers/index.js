import React from "react";

export function transformReactToHtml(element) {
  if (element.props.ignore) return;

  let { children, ...attrs } = element.props;

  if (Array.isArray(children)) {
    const res = [];

    children.forEach(child => {
      if (child?.type) {
        res.push(transformReactToHtml(child));
      } else {
        res.push(child);
      }
    });

    children = res;
  } else if (children?.type) {
    children = [transformReactToHtml(children)];
  }

  if (attrs.style) {
    //...
    ({ attrs } = { ...attrs, style: attrs.style });
  }

  return { type: element.type, attrs, children };
}

export function transformHtmlToReact(element) {
  const childrens = [];
  for (let el of element.children) {
    const attrs = [];
    for (let attr of el.attributes) {
      attrs.push(attr);
    }
    const child = React.createElement(el.nodeName, attrs);
    childrens.push(child);
  }

  return React.createElement(
    "div",
    { className: "form-control", id: "sdlfkj", key: "sdlfkj" },
    childrens
  );
}
