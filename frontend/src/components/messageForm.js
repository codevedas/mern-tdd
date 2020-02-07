import React from 'react';
class MessageForm extends React.Component {
  constructor(){
    super()
    this.state = {
      currentMessage: ''
    }
  }

  changeMessageValue(change){
    this.setState({
      currentMessage: change
    })
  }

  processSubmit(e){
     e.preventDefault()
      this.props.submitMessage(this.state.currentMessage)
      this.changeMessageValue('')
    }

render(){
    return (
        <form
          ref='formRef'
          onSubmit={(e)=>this.processSubmit(e)}
          >
          <textarea
           onChange={(e)=>this.changeMessageValue(e.target.value)}
           value={this.state.currentMessage}
           id='message_box'>
          </textarea>
          <br/>
          <button
            type="submit"
            name="Submit"
            id="submit">
            Submit
          </button>
        </form>
    );
  }
}
export default MessageForm;
