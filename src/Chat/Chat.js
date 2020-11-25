import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
      inputText: '',
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  addAutoReply = (currentMessage, messageList) => {
    let newMessageList = messageList;
    for (let i = 0; i < answersData.length; i += 1) {
      const answer = answersData[i];
      for (let j = 0; j < answer.tags.length; j += 1) {
        if (currentMessage.includes(answer.tags[j])) {
          newMessageList = messageList.concat(answer);
          break;
        }
      }
    }
    return newMessageList;
  };

  handleMessage = () => {
    const currentMessage = this.state.inputText;
    const message = { role: ROLE.CUSTOMER, text: currentMessage };
    let messageList = this.state.messages.concat(message);
    messageList = this.addAutoReply(currentMessage, messageList);

    this.setState({
      inputText: '',
    });
    setTimeout(() => {
      this.setState({
        messages: messageList,
      });
    }, 1000);
  };

  handleChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  render() {
    const { shop, messages, inputText } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput text={inputText} onTextChange={this.handleChange} onClick={this.handleMessage} />
      </main>
    );
  }
}

export default Chat;
