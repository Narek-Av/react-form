import React, { Component } from "react";

import Post from "./Post";

class PostList extends Component {
  filterSelectedPosts(posts, selectedPosts) {
    return posts.filter(
      post => !selectedPosts.find(sPost => sPost.id === post.id)
    );
  }

  render() {
    const { posts, selectedPosts, likeComment, addNewComment } = this.props;

    return (
      <div className="post-container">
        {posts &&
          this.filterSelectedPosts(posts, selectedPosts).map(post => (
            <Post
              key={post.id}
              post={post}
              likeComment={(commentId, replyId) =>
                likeComment(post.id, commentId, replyId)
              }
              addNewComment={(comment, commentId) =>
                addNewComment(post.id, comment, commentId)
              }
            />
          ))}
      </div>
    );
  }
}

export default PostList;
