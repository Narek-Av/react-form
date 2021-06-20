import React, { Component } from "react";
import PostContext from "../../context/PostContext";

import "./PostSorter.css";

export default class PostSorter extends Component {
  static contextType = PostContext;
  state = {
    selectedList: [],
    sortMethod: "desc",
  };

  onSelectHandler(posts, togglePostHandler, selectedPosts) {
    const oldPosts = posts.filter(
      post => !selectedPosts.find(sPost => sPost.id === post.id)
    );

    if (oldPosts.length === 0) return;

    const selectedPost = this.calculateAverage(oldPosts);

    this.setState(({ selectedList }) => ({
      selectedList: [...selectedList, selectedPost],
    }));

    this.onSortHandler();

    window.scrollTo(0, document.body.scrollHeight);

    togglePostHandler(selectedPost, "add");
  }

  calculateAverage(posts) {
    return posts
      .map(post => {
        let tPost = post.comments.reduce(
          (post, comment) => {
            return {
              ...post,
              ratings: comment.rating + post.ratings,
            };
          },
          { ...post, ratings: 0 }
        );
        return {
          ...post,
          averageRating:
            tPost.ratings === 0 ? 0 : tPost.ratings / post.comments.length,
        };
      })
      .sort((a, b) => b.averageRating - a.averageRating)[0];
  }

  onHideHandler(id, togglePostHandler) {
    this.setState(({ selectedList }) => ({
      selectedList: selectedList.filter(item => item.id !== id),
    }));
    togglePostHandler(id);
  }

  onSortHandler(changeMethod) {
    this.setState(({ selectedList }) => {
      let sortedList;
      if (!changeMethod || this.state.sortMethod === "asc") {
        sortedList = selectedList.sort(
          (a, b) => b.averageRating - a.averageRating
        );
      } else {
        sortedList = selectedList.sort(
          (a, b) => a.averageRating - b.averageRating
        );
      }

      return {
        selectedList: sortedList,
        sortMethod: changeMethod
          ? this.state.sortMethod === "desc"
            ? "asc"
            : "desc"
          : "desc",
      };
    });
  }

  render() {
    const { selectedList } = this.state;
    const { posts, togglePostHandler, selectedPosts } = this.context;

    return (
      <div className="comment-average-container">
        <div className="average-btns">
          <button
            className="btn btn-sort"
            onClick={() => this.onSortHandler(true)}
          ></button>
          <button
            className="btn"
            onClick={() =>
              this.onSelectHandler(posts, togglePostHandler, selectedPosts)
            }
          >
            +
          </button>
        </div>
        <div className="average-content">
          <ul className="average-list">
            {selectedList.map(post => (
              <li className="average-list-item" key={post.id}>
                <h3>{post.title}</h3>
                <p>Average Comment Rating {post.averageRating.toFixed(2)}</p>
                <button
                  className="btn hide-button"
                  onClick={() => this.onHideHandler(post.id, togglePostHandler)}
                ></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
