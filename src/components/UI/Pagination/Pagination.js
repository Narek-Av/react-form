import React, { Component } from "react";

import "./Pagination.css";

export default class Pagination extends Component {
  renderButtons() {
    const { itemCount, pageItemCount, postPagination, currentPage } =
      this.props;
    const pageCount = Math.ceil(itemCount / pageItemCount);
    const btns = [];

    for (let i = 1; i <= pageCount; i++) {
      btns.push(
        <button
          className={`pagination-btn${
            i === currentPage ? " pagination-btn-active" : ""
          }`}
          onClick={() => postPagination(i)}
          key={i}
        >
          {i}
        </button>
      );
    }
    return btns;
  }

  componentDidMount() {}

  render() {
    return <div className="pagination-container">{this.renderButtons()}</div>;
  }
}
