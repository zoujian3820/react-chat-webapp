/**
 * Created by Mrzou on 2018/3/8.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'

@connect(
   state=>state.user,
   {logoutSubmit}
)

class User extends React.Component {
   constructor(props) {
      super(props)
      this.logout = this.logout.bind(this)
   }

   logout() {
      Modal.alert('注销', '确认退出登录吗？', [
         {text: '取消', onPress: () => console.log('cancel')},
         {
            text: '确认',
            onPress: () => new Promise((resolve) => {
               setTimeout(()=> {
                  resolve()
                  browserCookie.erase('userid') //清除cookie
                  this.props.logoutSubmit()     //触发logoutSubmit Action type:LOGOUT,清空redux state,重定向redirectTo='/login'
               }, 100);
            })
         }
      ])
   }

   render() {
      const props = this.props
      const Item = List.Item
      const Brief = Item.Brief

      return props.user ? (
         <div>
            <Result
               img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} />}
               title={props.user}
               message={props.type == 'boss' && props.company}
            />
            <List renderHeader={()=>'简介'}>
               <Item wrap onClick={()=>{}}>
                  {props.title}
                  {props.desc.split('\n').map(v=>(<Brief key={v}>{v}</Brief>))}
                  {props.money && <Brief>薪资：{props.money}</Brief>}
               </Item>
            </List>
            <WhiteSpace></WhiteSpace>
            <List>
               <Item onClick={this.logout}>退出登录</Item>
            </List>
         </div>
      ) : props.redirectTo ? <Redirect to={props.redirectTo}></Redirect> : null
   }
}

export default User