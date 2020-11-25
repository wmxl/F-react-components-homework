import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  render() {
    return (
      <footer className="ChatInput">
        <input type="text" value={this.props.text} onChange={this.props.onTextChange} />
        <button type="button" onClick={this.props.onClick}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
