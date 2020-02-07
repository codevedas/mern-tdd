import React from 'react';
class MessageForm extends React.Component {
  render(){
    return (
      <form
       id='message_form'
       >
        <textarea
        id='message_box'>
        </textarea>
        <br/>
        <button
        type="button"
        name="Submit"
        id="submit">
        Submit
      </button>
      </form>
    );
  }
}
export default MessageForm;
