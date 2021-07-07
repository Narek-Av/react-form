import React from "react";

import "./Input.css";

const Input = ({ active }) => {
  const handleDragStart = e => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("type/element", "input");

    setTimeout(() => {
      e.target.classList.add("hiden");
    }, 0);
  };

  const handleDragEnd = e => {
    e.target.classList.remove("hiden");
  };

  return (
    <div
      className={`input${active ? " active" : ""}`}
      draggable={!active}
      onDragStart={e => handleDragStart(e)}
      onDragEnd={e => handleDragEnd(e)}
    >
      <input data-name="hello" placeholder="Input" />
    </div>
  );
};

export default Input;
