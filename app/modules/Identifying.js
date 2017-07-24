'use strict';

import React from 'react' ;
import ReactDOM from 'react-dom' ;
import Ajax from './ajax.js';
import PropTypes from 'prop-types';

// 倒计时组件
class Count extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
      return (
        <span>{this.props.count<=0?"发送验证码":`${this.props.pre+this.props.count+'s'+this.props.suf}`}</span>
      )
  }
}

// 输出的交互组件
class Identifying extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      value:"",
      count:0,
      preText:this.props.preText,
      sufText:this.props.sufText
    }
    this.handleChange = this.handleChange.bind(this);
    this.countReset = this.countReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  countReset() {
    this.setState({value: "",count:0});
  }
  handleSubmit(e){

    e.preventDefault()

    console.log("ok1")

    if (this.state.count>0) {
      console.log("还不行，再等等");
      return
    }

    console.log("ok2")

    // 手机号格式校验
    let phoneReg = /^1[34578]\d{9}$/;
    if(!phoneReg.test(this.state.value))
     {
        alert('请输入有效的手机号码！');
        return
     } else {
        console.log("ok3")
        //  alert('手机号可以了！');
         Ajax.post("/getCode",{phone:this.state.value},(res)=>{
           if (JSON.parse(res).code) {
             this.setState({count: this.props.fullTime});
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
  componentWillUnmount(){
    this.countReset()
  }
  render(){
    return (
      <div>
      <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="填写手机号"/>
      <button className={this.state.count>0?"disable":""} onClick={this.handleSubmit}>
        <Count {...this.props} count={this.state.count} pre={this.props.preText} suf={this.props.sufText}></Count>
      </button>
      <button className={this.state.count>0?"":"disable"} onClick={this.countReset}>重置</button>
      </div>
    )
  }
}

// prop validation
Identifying.propTypes = {
    fullTime: PropTypes.number
}

export { Identifying as default } ;
