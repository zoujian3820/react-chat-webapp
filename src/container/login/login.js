/**
 * Created by Mrzou on 2018-1-19.
 */
import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import compForm from '../../component/form/form'

/*
//高阶组件---属性代理

function WrapperHello(Comp) {
   class WrapComp extends React.Component {
      render() {
         return (
            <div>
               <p>这是HOC高阶组件特有的元素</p>
               <Comp {...this.props}></Comp>
            </div>
         )
      }
   }
   return WrapComp
}
//高阶组件---逆向继承
function WrapperExtend(Comp) {
   class WrapComp extends Comp {
      componentDidMount() {
         console.log('高阶组件新增的生命周期，加载完成')
      }

      render() {
         return <Comp></Comp>
      }
   }
   return WrapComp
}

@WrapperHello
class Hello extends React.Component {
   render() {
      return <h2>hell react&&redux</h2>
   }
}

*/

@connect(
   state=>state.user,
   {login}
)

@compForm
class Login extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         user: '',
         pwd: ''
      }
      this.register = this.register.bind(this)
      this.handleLogin = this.handleLogin.bind(this)
   }

   register() {
      console.log(this.props)
      this.props.history.push('/register')
   }

   //handleChange(key, val) {
   //   this.setState({
   //      [key]: val
   //   })
   //}

   handleLogin() {
      this.props.login(this.props.state)
   }

   render() {
      return (
         <div>
            {/*  高阶组件 <Hello></Hello>*/}

            {/*登录跳转*/}
            {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}></Redirect> : null}
            <Logo></Logo>
            <WingBlank>
               <List>
                  {this.props.msg ? <p style={{margin:0}} className="error-msg">{this.props.msg}</p> : null}
                  <InputItem
                     onChange={v=>this.props.handleChange('user',v)}
                  >用户</InputItem>
                  <InputItem
                     onChange={v=>this.props.handleChange('pwd',v)}
                     type="password"
                  >密码</InputItem>
               </List>
               <WhiteSpace />
               <Button type="primary"
                       onClick={this.handleLogin}
               >登录</Button>
               <WhiteSpace />
               <Button onClick={this.register} type="primary">注册</Button>
               <WhiteSpace />
               <WhiteSpace />
            </WingBlank>
         </div>
      )
   }
}

export default Login