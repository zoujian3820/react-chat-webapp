/**
 * Created by Mrzou on 2018-1-19.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, Button, Radio} from 'antd-mobile'
import {register} from '../../redux/user.redux'
import compForm from '../../component/form/form'

@connect(
   state=>state.user,
   {register}
)

@compForm
class Register extends React.Component {
   constructor(props) {
      super(props)
      //this.state = {
      //   type: 'genius', //或者boss
      //   user: '',
      //   pwd: '',
      //   repeatpwd: ''
      //}
      this.handleRegister = this.handleRegister.bind(this)
   }

   componentDidMount() {
      this.props.handleChange('type', 'genius')
   }

   handleRegister() {
      console.log(this.props.state)
      this.props.register(this.props.state)
   }

   //handleChange(key, val) {
   //   this.setState({
   //      [key]: val
   //   })
   //   // console.log(this)
   //}

   //register() {
   //   console.log(this.props)
   //   this.props.history.push('/register')
   //}

   render() {
      const RadioItem = Radio.RadioItem
      return (
         <div>
            {/*注册跳转*/}
            {this.props.redirectTo && this.props.redirectTo !== '/register' ?
               <Redirect to={this.props.redirectTo}></Redirect> : null}
            <Logo></Logo>
            <List>
               {this.props.msg ? <p style={{margin:0}} className="error-msg">{this.props.msg}</p> : null}
               <InputItem onChange={v=>this.props.handleChange('user',v)}> 用户</InputItem>
               <WhiteSpace />
               <InputItem type="password" onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
               <WhiteSpace />
               <InputItem type="password" onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
               <WhiteSpace />
               <RadioItem onChange={v=>this.props.handleChange('type','genius')}
                          checked={this.props.state.type === 'genius'}>牛人</RadioItem>
               <WhiteSpace />
               <RadioItem onChange={v=>this.props.handleChange('type','boss')}
                          checked={this.props.state.type === 'boss'}>BOSS</RadioItem>
               <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </List>
         </div>
      )
   }
}

//Register = connect(state=>state.user, {register})(Register)
export default Register