import React from "react";

import CommentAverage from "../PostSorter";
import PostList from "../Posts";
import ToggleButtons from "../ToggleButton";
import Search from "../Search";
import Pagination from "../UI/Pagination";

import dummyPost from "../../dummyPosts.json";

import "./App.css";

class App extends React.Component {
  state = {
    posts: dummyPost,
    selectedPosts: [],
    searchValue: "",
    currentPage: 1,
    pageItemCount: 4,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.selectedPosts !== this.state.selectedPosts) {
      const pagePostCount = this.filteredPostList();

      pagePostCount.length === 0 &&
        this.state.currentPage !== 1 &&
        this.setState(prevState => ({
          currentPage: prevState.currentPage - 1,
        }));
    }
  }

  updatePostList(postId, hide) {
    this.setState(({ selectedPosts }) => ({
      selectedPosts: !hide
        ? [...selectedPosts, postId]
        : selectedPosts.filter(id => id !== postId),
    }));
  }

  filteredPostList(isSelected) {
    const { posts, selectedPosts, searchValue, currentPage, pageItemCount } =
      this.state;
    const filteredPosts = posts.filter(
      post => !selectedPosts.includes(post.id)
    );

    return searchValue
      ? filteredPosts.filter(
          post =>
            post.title.toLowerCase().includes(searchValue) ||
            post.content.toLowerCase().includes(searchValue) ||
            post.comments.find(comment =>
              comment.text.toLowerCase().includes(searchValue)
            )
        )
      : !isSelected
      ? filteredPosts.slice(
          (currentPage - 1) * pageItemCount,
          currentPage * pageItemCount
        )
      : filteredPosts;
  }

  addNewComment(postId, comment, commentId) {
    this.setState(state => ({
      posts: state.posts.map(post => {
        if (post.id !== postId) {
          return post;
        }

        const generetId = commentId
          ? `${post.id}${Math.random()}${post.comments.length}`
          : `${post.id}${post.comments.length}`;

        const newComment = {
          id: generetId,
          text: comment,
          rating: 0,
          date: new Date(),
          user: {
            name: "User User",
          },
        };

        if (!commentId) {
          newComment.replyes = [];

          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }

        const replyedComments = post.comments.map(comment => {
          if (comment.id !== commentId) {
            return comment;
          }

          return {
            ...comment,
            replyes: [...comment.replyes, newComment],
          };
        });

        return {
          ...post,
          comments: replyedComments,
        };
      }),
    }));
  }

  likeComment(postId, commentId, replyId) {
    this.setState(state => ({
      posts: state.posts.map(post => {
        if (post.id !== postId) {
          return post;
        }

        if (!replyId) {
          return {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, rating: comment.rating + 1 }
                : comment
            ),
          };
        }

        const replyComments = post.comments.map(comment => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            replyes: comment.replyes.map(reply =>
              reply.id === replyId
                ? { ...reply, rating: reply.rating + 1 }
                : reply
            ),
          };
        });

        return {
          ...post,
          comments: replyComments,
        };
      }),
    }));
  }

  postPagination(page) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.setState({ currentPage: page });
  }

  calculateItemCount() {
    return this.state.posts.length - this.state.selectedPosts.length;
  }

  render() {
    return (
      <div className="app-container">
        <ToggleButtons />
        <Search searchPost={value => this.setState({ searchValue: value })} />
        <PostList
          posts={this.filteredPostList()}
          selectedPosts={this.state.selectedPosts}
          likeComment={this.likeComment.bind(this)}
          addNewComment={this.addNewComment.bind(this)}
        />
        {!this.state.searchValue &&
          this.state.pageItemCount < this.calculateItemCount() && (
            <Pagination
              itemCount={this.calculateItemCount()}
              pageItemCount={this.state.pageItemCount}
              postPagination={selectPage => this.postPagination(selectPage)}
              currentPage={this.state.currentPage}
            />
          )}

        <div className="average-group">
          <CommentAverage
            posts={this.filteredPostList(true)}
            updatePostList={(id, hide) => this.updatePostList(id, hide)}
            searchValue={this.state.searchValue}
          />
          <CommentAverage
            posts={this.filteredPostList(true)}
            updatePostList={(id, hide) => this.updatePostList(id, hide)}
            searchValue={this.state.searchValue}
          />
        </div>
      </div>
    );
  }
}

export default App;
