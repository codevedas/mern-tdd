import React from 'react';
class ErrorHandler extends React.Component {
  render(){
    let result;
    if (this.props.error) {
      result = `Error: ${this.props.error.data}`
    }
    return <div id='error'>{result}</div>
  };
}
export default ErrorHandler;
