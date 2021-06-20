import React, { Component } from "react";

import PostContext from "../../context/PostContext";

import Post from "./Post";

class PostList extends Component {
  static contextType = PostContext;

  render() {
    const { posts, selectedPosts, likeComment, addNewComment } = this.context;

    return (
      <div className="post-container">
        {posts &&
          posts
            .filter(post => !selectedPosts.find(sPost => sPost.id === post.id))
            .map(post => (
              <Post
                key={post.id}
                post={post}
                likeComment={likeComment}
                newComment={addNewComment}
              />
            ))}
      </div>
    );
  }
}

export default PostList;
