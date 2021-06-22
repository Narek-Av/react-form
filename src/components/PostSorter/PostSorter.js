import React, { Component } from "react";

import "./PostSorter.css";

export default class PostSorter extends Component {
  state = {
    selectedPosts: [],
  };

  calculateAverage() {
    return this.props.posts
      .map(post => {
        const tPost = post.comments.reduce(
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

  togglePost(id) {
    if (this.props.posts.length === 0 && !id) return;

    const selectedPost = this.calculateAverage();

    this.setState(({ selectedPosts }) => ({
      selectedPosts: !id
        ? [...selectedPosts, selectedPost].sort(
            (a, b) => b.averageRating - a.averageRating
          )
        : selectedPosts.filter(post => post.id !== id),
    }));

    window.scrollTo(0, document.body.scrollHeight);

    id
      ? this.props.updatePostList(id, true)
      : this.props.updatePostList(selectedPost.id);
  }

  onSortHandler() {
    this.setState(({ selectedPosts }) => ({
      selectedPosts: [...selectedPosts].reverse(),
    }));
  }

  clearList() {
    this.setState(({ selectedPosts }) => {
      selectedPosts.forEach(post => {
        this.props.updatePostList(post.id, true);
      });
      return {
        selectedPosts: [],
      };
    });
  }

  render() {
    const { selectedPosts } = this.state;
    const { searchValue } = this.props;

    let items = searchValue
      ? selectedPosts.filter(
          post =>
            post.title.toLowerCase().includes(searchValue) ||
            post.content.toLowerCase().includes(searchValue)
        )
      : selectedPosts;

    return (
      <div className="comment-average-container">
        <div className="average-btns">
          <button
            className="btn btn-sort"
            onClick={() => this.onSortHandler()}
          ></button>
          <button className="btn btn-reset" onClick={() => this.clearList()}>
            &#8634;
          </button>
          <button className="btn" onClick={() => this.togglePost()}>
            +
          </button>
        </div>
        <div className="average-content">
          <ul className="average-list">
            {items.map(post => (
              <li className="average-list-item" key={post.id}>
                <h3>{post.title}</h3>
                <p>Average Comment Rating {post.averageRating.toFixed(2)}</p>
                <div className="rating">
                  {post.averageRating >= 5 ? (
                    <span className="rating-excellent">&#x1F642;</span>
                  ) : post.averageRating < 5 && post.averageRating >= 4 ? (
                    <span className="rating-good">&#x1F610;</span>
                  ) : post.averageRating < 4 ? (
                    <span className="rating-bad">&#128577;</span>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  className="btn hide-button"
                  onClick={() => this.togglePost(post.id)}
                ></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
