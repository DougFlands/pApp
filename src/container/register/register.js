import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from "antd-mobile";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import { regisger } from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form';

@connect(
  state=>state.user,
  {regisger}
)
@imoocFrom
class Register extends React.Component{
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount() {
    this.props.handleChange('type','genius')
  }
  handleRegister() {
    this.props.regisger(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} />: null}
        <Logo></Logo>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
        <WingBlank>
          <List>
            <InputItem onChange={v=>this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace />
            <InputItem onChange={v=>this.props.handleChange('pwd', v)} type='password'>密码</InputItem>
            <WhiteSpace />
            <InputItem onChange={v=>this.props.handleChange('repeatpwd', v)} type='password'>确认密码</InputItem>
            <WhiteSpace />
            <RadioItem checked={this.props.state.type === 'genius'}
              onChange={() => this.props.handleChange('type', 'genius')}>
              求职者
            </RadioItem>
            <RadioItem checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}>
              老板
            </RadioItem>
          </List>
          <Button type='primary' onClick={this.props.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register