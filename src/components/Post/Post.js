import React, { Component } from "react";

import format from "dateformat";

import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.commentRef = React.createRef();
  }

  onSubmitHandler(e) {
    e.preventDefault();

    const { post, newComment } = this.props;
    const comment = e.target.comment.value;

    if (comment.trim().length > 0) {
      newComment(post.id, comment);
      e.target.comment.value = "";
    }
  }

  renderCommentsList(comments) {
    return comments.map(comment => (
      <li className="comment-list-item" key={comment.id}>
        <div className="comment-left">
          <div className="user-avatar">
            <span>&#128104;</span>
          </div>
        </div>
        <div className="comment-right">
          <div className="comment-user-name">
            <h3>{comment.user.name}</h3>
            <div className="comment-date">
              {format(comment.date, "mmmm dS, yyyy, h:MM")}
            </div>
          </div>
          <div className="comment-text">{comment.text}</div>
          <div className="comment-info">
            <div className="comment-like">
              <button
                className="comment-like-btn"
                onClick={() =>
                  this.props.likeComment(this.props.post.id, comment.id)
                }
              >
                <span>&#128077;</span>
              </button>
            </div>
            <div className="comment-rating">
              <div className="comment-rating-icon">
                <span>&#11088;</span>
                {comment.rating}
              </div>
            </div>
          </div>
        </div>
      </li>
    ));
  }

  render() {
    const { post } = this.props;

    return (
      <div className="post-container">
        <div className="post-list">
          <li className="post-list-item" key={post.id}>
            <h2 className="post-title">{post.title}</h2>
            <div className="post-content">
              <p>{post.content}</p>
              <button
                className="post-comment-btn"
                onClick={() => this.commentRef.current.focus()}
              >
                Comment
              </button>
            </div>
            <ul className="comment-list">
              {this.renderCommentsList(post.comments)}
            </ul>
            <div className="post-comment-add">
              <form onSubmit={e => this.onSubmitHandler(e)}>
                <input
                  ref={this.commentRef}
                  type="text"
                  id="comment"
                  placeholder="Add a comment..."
                />
              </form>
            </div>
          </li>
        </div>
      </div>
    );
  }
}

export default Post;
