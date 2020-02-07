import React, { Component } from 'react';
import MessageList from './components/messageList.js'
import MessageForm from './components/messageForm.js'
import axios from 'axios';
const PORT = 'http://localhost:3001';

class MessageApp extends Component {
  constructor(){
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount(){
    this.getAllMessages()
  }

  getAllMessages=()=>{
    axios.get(`${PORT}/`)
    .then((result)=>{
      this.setState({
        messages: result.data
      })
    })
  }

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
    .then(()=> this.getAllMessages())
  }

  render(){
    return (
      <div>
      <MessageForm
      ref='messageFormRef'
      submitMessage={this.submitMessage}
      />
      <MessageList
      messages={this.state.messages}
      />
      </div>
    );
  }
}
export default MessageApp;
