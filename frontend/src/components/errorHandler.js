import React from 'react';
class ErrorHandler extends React.Component {
  render(){
    let result;
    if (!this.props.error) {
      } else {
        result = `Error: ${this.props.error.response.data}`
      }
    return <div id='error'>{result}</div>
  };
}
export default ErrorHandler;
