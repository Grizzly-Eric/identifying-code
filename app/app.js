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
      return (
        <span>{this.props.count<=0?"发送验证码":`${this.props.pre+this.props.count+'s'+this.props.suf}`}</span>
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
        count:0,
        fullTime:60,
        preText:"请耐心等待",
        sufText:"后再发送"
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.timeChange = this.timeChange.bind(this);
      this.preChange = this.preChange.bind(this);
      this.sufChange = this.sufChange.bind(this);
      this.countReset = this.countReset.bind(this);
    }

    handleChange(e) {
      this.setState({value: e.target.value});
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
    countReset(e) {
      this.setState({value: "",count:0});
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
               this.setState({count: this.state.fullTime});
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
            <Count count={this.state.count} pre={this.state.preText} suf={this.state.sufText}></Count>
          </button>
          <button type="reset" className={this.state.count>0?"":"disable"} onClick={this.countReset}>重置</button>
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

console.log("ok");
