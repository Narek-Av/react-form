import React, { Component } from "react";

import dateFormat from "dateformat";

import "./Comments.css";
import NewComment from "./NewComment";
import ReplyComment from "./ReplyComment";

export default class Comments extends Component {
  state = {
    selectedComment: "",
  };

  constructor(props) {
    super(props);
    this.commentRef = React.createRef();
    this.replyCommentRef = React.createRef();
  }

  commentDateFormater(date) {
    return dateFormat(date, "mmmm dS, yyyy, h:MM");
  }

  render() {
    const { comments, likeComment, addNewComment } = this.props;

    return (
      <div className="comment-container">
        <button
          className="post-comment-btn"
          onClick={() => this.commentRef.current.focus()}
        >
          Comment
        </button>
        <ul className="comment-list">
          {comments.map(comment => (
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
                    {this.commentDateFormater(comment.date)}
                  </div>
                </div>
                <div className="comment-text">{comment.text}</div>
                <div className="comment-info">
                  <div className="comment-like">
                    <button
                      className="comment-like-btn"
                      onClick={() => likeComment(comment.id)}
                    >
                      <span>&#128077;</span>
                    </button>
                  </div>
                  <div className="comment-reply-btn">
                    <button
                      className="btn-replay"
                      onClick={() =>
                        this.setState(() => ({
                          selectedComment:
                            this.state.selectedComment !== comment.id
                              ? comment.id
                              : "",
                        }))
                      }
                    >
                      Reply
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
              {this.state.selectedComment === comment.id && (
                <div className="comment-reply">
                  <NewComment
                    commentRef={this.replyCommentRef}
                    sendComment={replyComment => {
                      addNewComment(replyComment, comment.id);
                      this.setState({ selectedComment: "" });
                    }}
                  />
                </div>
              )}
              {comment.replyes && (
                <ReplyComment
                  likeReplyComment={replyId => likeComment(comment.id, replyId)}
                  comments={comment.replyes}
                />
              )}
            </li>
          ))}
        </ul>
        <NewComment commentRef={this.commentRef} sendComment={addNewComment} />
      </div>
    );
  }
}
