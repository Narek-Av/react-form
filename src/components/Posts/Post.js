import React, { Component } from "react";
import Comments from "../Comments/Comments";

import "./Post.css";

class Post extends Component {
  render() {
    const { post, likeComment, addNewComment } = this.props;

    return (
      <div className="post">
        <div className="post-item">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-content">
            <p>{post.content}</p>
          </div>

          <Comments
            comments={post.comments}
            addNewComment={(comment, commentId) =>
              addNewComment(comment, commentId)
            }
            likeComment={likeComment}
          />
        </div>
      </div>
    );
  }
}

export default Post;
