'use strict';

import React from 'react' ;
import ReactDOM from 'react-dom' ;
import "./style.less"

class Form extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        value:""
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      this.setState({value: event.target.value});
    }

    handleSubmit(e){
      e.preventDefault()
      console.log("submit");
    }

    render(){
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <button type="submit">发送验证码</button>
        </form>)
    }
}

ReactDOM.render(
  <Form></Form>,
  document.getElementById('app')
);


console.log("ok");
