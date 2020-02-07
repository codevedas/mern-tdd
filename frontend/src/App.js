import React from 'react';
import MessageList from './components/messageList.js'
import MessageForm from './components/messageForm.js'
import './App.css';
class MessageApp extends React.Component {
  render(){
    return (
      <div className="App">
      <MessageForm
      ref='messageFormRef'
      />
      <MessageList/>
      </div>
    );
  }
}
export default MessageApp;
