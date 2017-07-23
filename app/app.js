'use strict';

import React from 'react' ;
import ReactDOM from 'react-dom' ;
import Identifying from './modules/Identifying.js'; // 引入组件
import "./style.less"

// 表单组件
class Form extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        fullTime:60,
        preText:"请耐心等待",
        sufText:"后再发送"
      };

      this.timeChange = this.timeChange.bind(this);
      this.preChange = this.preChange.bind(this);
      this.sufChange = this.sufChange.bind(this);

    }

    timeChange(e) {
      if (e.target.value==Number(e.target.value)) {
        this.setState({fullTime: e.target.value});
      }
    }
    preChange(e) {
      this.setState({preText: e.target.value});
    }
    sufChange(e) {
      this.setState({sufText: e.target.value});
    }

    render(){

      return (
        <form>

          <Identifying fullTime={this.state.fullTime} preText={this.state.preText} sufText={this.state.sufText} postUrl="/getCode"></Identifying>

          <hr />
          <p>
            <label>倒计时时间：</label>
            <input type="text" value={this.state.fullTime} onChange={this.timeChange}/>
          </p>
          <p>
            <label>文案模板：</label>
            <input type="text" value={this.state.preText} onChange={this.preChange}/>
            <label>{this.state.fullTime}s</label>
            <input type="text" value={this.state.sufText} onChange={this.sufChange}/>
          </p>
        </form>)
    }
}

ReactDOM.render(
  <Form></Form>,
  document.getElementById('app')
);
