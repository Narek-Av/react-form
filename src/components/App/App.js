import React from "react";

import PostContext from "../../context/PostContext";

import dummyPost from "../../dummyPosts.json";
import CommentAverage from "../PostSorter/PostSorter";

import PostList from "../Post/PostList";
import ToggleButtons from "../ToggleButton";

import "./App.css";

class App extends React.Component {
  state = {
    posts: dummyPost,
    selectedPosts: [],
    togglePostHandler: (post, type) => this.togglePostHandler(post, type),
    likeComment: (postId, commentId) => this.likeComment(postId, commentId),
    addNewComment: (postId, comment) => this.addNewComment(postId, comment),
  };

  likeComment(postId, commentId) {
    this.setState(state => ({
      posts: state.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, rating: comment.rating + 1 }
                : comment
            ),
          };
        } else {
          return post;
        }
      }),
    }));
  }

  addNewComment(postId, comment) {
    this.setState(state => ({
      posts: state.posts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `${post.id}${post.comments.length + 1}`,
            text: comment,
            rating: 0,
            date: new Date(),
            user: {
              name: "User User",
              avatar: "",
            },
          };

          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        } else {
          return post;
        }
      }),
    }));
  }

  togglePostHandler(selectedPost, type) {
    this.setState(({ selectedPosts }) => ({
      selectedPosts:
        type === "add"
          ? [...selectedPosts, selectedPost]
          : selectedPosts.filter(post => post.id !== selectedPost),
    }));
  }

  render() {
    return (
      <PostContext.Provider value={this.state}>
        <div className="app-container">
          <ToggleButtons />
          <PostList />
          <div className="average-group">
            <CommentAverage />
            <CommentAverage />
          </div>
        </div>
      </PostContext.Provider>
    );
  }
}

export default App;
