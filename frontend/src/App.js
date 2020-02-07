import React from 'react';
function MessageApp(){
  return (
    <div className="App">
      <textarea
        id='message_box'>
        </textarea>
        <br/>
        <button
        type="submit"
        name="Submit"
        id="submit">
        Submit
      </button>
      <ul
      id="message_list">
      message
      </ul>
    </div>
  );
}
export default MessageApp;
