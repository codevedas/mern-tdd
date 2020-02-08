import React, {Component} from 'react';
class MessageList extends Component {
  constructor(){
    super()
    this.state = {
      editMode: {
        id: null,
        content: null
      }
    }
  }

  toggleUpdate(message){
    this.setState({
      editMode: {
        id: message.id,
        content: message.content
      }
    })
  }
  formatMessage(message){
    let updateButton = <button
    onClick={()=>this.toggleUpdate(message)}
    id='update'>
    update
    </button>
    if (message.id === this.state.editMode.id){
      updateButton = (<button
        onClick={()=>this.toggleUpdate(!message)}
        id='send'>
        Send Update
        </button>)
      }
      return <li
      className='message'
      key={message.id}>
      {message.content}
      <br/>
      {message.date}
      <br/>
      <button
      id='delete'
      onClick={()=>this.props.handleDelete(message.id)}>
      delete
      </button>
      {updateButton}
      </li>
    }
    render(){
      if (!this.props.messages){
        return <ul id='message_list'>no messages</ul>
      }
      if (this.props.messages){
        return <div>
        <ul id='message_list'>
        {this.props.messages.map(message=>{
          return this.formatMessage(message)
        })}
        </ul>
        </div>
      }
    }
  };
  export default MessageList
