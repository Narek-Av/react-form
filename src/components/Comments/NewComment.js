import React, { Component } from "react";

import Emojies from "../UI/Emojies";

export default class NewComment extends Component {
  state = {
    isFocused: false,
    showEmojies: false,
    value: "",
  };

  toggleEmojies() {
    this.setState(({ showEmojies }) => ({ showEmojies: !showEmojies }));
  }

  onFocusHandler(e) {
    this.setState({ isFocused: true });
    e.target.classList.add("comment-active");
  }

  onBlureHandler(e) {
    if (
      e.relatedTarget?.id !== "add-emoji-btn" &&
      e.relatedTarget?.className !== "emoji-btn" &&
      e.relatedTarget?.className !== "btn send-btn"
    ) {
      this.setState({ isFocused: false, showEmojies: false });
      e.target.classList.remove("comment-active");
    } else {
      this.setState({ isFocused: true });
    }
  }

  emojiesOnBlurHandler(e) {
    if (
      e.relatedTarget?.className !== "emoji-btn" &&
      e.relatedTarget?.name !== "comment-area"
    ) {
      this.setState({ showEmojies: false });
    }
  }

  addEmojiToComment(emoji) {
    this.setState(({ value }) => {
      return {
        value: value + " " + emoji,
      };
    });
    this.props.commentRef.current.focus();
  }

  onSubmitHandler(e) {
    e.preventDefault();

    this.props.sendComment(this.state.value);

    this.setState({
      isFocused: false,
      showEmojies: false,
      value: "",
    });
    this.props.commentRef.current.classList.remove("comment-active");
  }

  render() {
    const { value, isFocused, showEmojies } = this.state;

    return (
      <div className="post-comment-add">
        <form onSubmit={e => this.onSubmitHandler(e)}>
          <div className="form-group">
            <textarea
              ref={this.props.commentRef}
              type="text"
              placeholder="Add a comment..."
              onFocus={e => this.onFocusHandler(e)}
              onBlur={e => this.onBlureHandler(e)}
              name="comment-area"
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
            />
            {isFocused && (
              <button
                type="button"
                className="add-emoji-btn"
                id="add-emoji-btn"
                onClick={() => this.toggleEmojies()}
                onBlur={e => this.emojiesOnBlurHandler(e)}
              >
                <span>&#9786;</span>
              </button>
            )}
          </div>
          {showEmojies && (
            <Emojies selectEmoji={emoji => this.addEmojiToComment(emoji)} />
          )}
          {isFocused && value.trim() !== "" && (
            <div className="form-button">
              <button className="btn send-btn" type="submit">
                Send
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}
