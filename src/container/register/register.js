/**
 * Created by Mrzou on 2018-1-19.
 */
import React from 'react'
import {connect} from 'react-redux'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, Button, Radio} from 'antd-mobile'
import {register} from '../../redux/user.redux'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'genius', //或者boss
      user: '',
      pwd: '',
      repeatpwd: ''
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleRegister() {
    console.log(this.state)
    this.props.register(this.state)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
    // console.log(this)
  }

  register() {
    console.log(this.props)
    this.props.history.push('/register')
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <InputItem onChange={v=>this.handleChange('user',v)}> 用户</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem onChange={v=>this.handleChange('type','genius')}
                     checked={this.state.type === 'genius'}>牛人</RadioItem>
          <WhiteSpace />
          <RadioItem onChange={v=>this.handleChange('type','boss')}
                     checked={this.state.type === 'boss'}>BOSS</RadioItem>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

Register = connect(state=>state.user, {register})(Register)
export default Register