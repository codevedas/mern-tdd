import React, { Component } from 'react';
import MessageList from './components/messageList.js'
import MessageForm from './components/messageForm.js'
import axios from 'axios';
const PORT = 'http://localhost:3001';

class MessageApp extends Component {
submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
  }
render(){
    return (
      <div>
      <MessageForm
      ref='messageFormRef'
      submitMessage={this.submitMessage}
      />
      <MessageList/>
      </div>
    );
  }
}
export default MessageApp;
