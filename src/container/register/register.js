/**
 * Created by Mrzou on 2018-1-19.
 */
import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }

  register() {
    console.log(this.props)
    this.props.history.push('/register')
  }

  render() {
    return (
      <div>
        <Logo></Logo>
        <h2>注册页</h2>
      </div>
    )
  }
}

export default Register