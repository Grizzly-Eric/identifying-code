'use strict';

import React from 'react' ;
import ReactDOM from 'react-dom' ;
import Ajax from './modules/ajax.js';
import "./style.less"

// 倒计时组件
class Count extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
      console.log(this.props.count);
      return (
        <span>{this.props.count<=0?"发送验证码":`请耐心等待${this.props.count}s`}</span>
      )
  }

}

// 表单组件
class Form extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        value:"",
        btnText:"发送验证码",
        count:0
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      this.setState({value: e.target.value});
    }

    handleSubmit(e){
      e.preventDefault()
      if (this.state.count>0) {
        console.log("还不行，再等等");
        return
      }

      // 手机号格式校验
      let phoneReg = /^1[34578]\d{9}$/;
      if(!phoneReg.test(this.state.value))
       {
          alert('请输入有效的手机号码！');
          return
       } else {
          //  alert('手机号可以了！');
           Ajax.post("/getCode",{phone:this.state.value},(res)=>{
             if (JSON.parse(res).code) {
               this.setState({count: 50});
               this.timer = setInterval(()=>{
                 this.setState({count: this.state.count-1});
                 if(this.state.count<1){
                   clearInterval(this.timer)
                 }
               },1000)
             }else{
               alert(JSON.parse(res).msg)
             }
           })
       }

    }

    render(){
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="填写手机号"/>
          <button type="submit" className={this.state.count>0?"disable":""}>
            <Count count={this.state.count}></Count>
          </button>
        </form>)
    }
}

ReactDOM.render(
  <Form></Form>,
  document.getElementById('app')
);

console.log("ok");
