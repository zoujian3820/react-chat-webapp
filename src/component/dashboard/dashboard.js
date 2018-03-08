/**
 * Created by Mrzou on 2018/3/6.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Route,Switch} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'

//function Boss() {
//   return <h2>Boss首页</h2>
//}

//function Genius() {
//   return <h2>牛人首页</h2>
//}
function Msg() {
   return <h2>消息列表</h2>
}
//function User() {
//   return <h2>个人中心</h2>
//}

@connect(
   state=>state
)
class Dashboard extends React.Component {
   constructor(props) {
      super(props)
   }

   render() {
      const {pathname} = this.props.location
      const user = this.props.user
      const navList = [
         {
            path: '/boss',
            text: '牛人',
            icon: 'boss',
            title: '牛人列表',
            component: Boss,
            hide: user.type == 'genius'
         },
         {
            path: '/genius',
            text: 'boss',
            icon: 'job',
            title: 'BOSS列表',
            component: Genius,
            hide: user.type == 'boss'
         },
         {
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: '消息列表',
            component: Msg
         },
         {
            path: '/me',
            text: '我',
            icon: 'user',
            title: '个人中心',
            component: User
         }
      ]

      return (
         <div>
            <NavBar className="fixed-header" mode="dard">{navList.find(v=>v.path == pathname).title}</NavBar>
            <div style={{marginTop:45}}>
               <Switch>
                  {
                     navList.map(v=>(
                        <Route key={v.path} path={v.path} component={v.component}></Route>
                     ))
                  }
               </Switch>
            </div>
            <NavLinkBar data={navList}></NavLinkBar>
         </div>
      )
   }
}

export default Dashboard
//<Route path="/boss" compoent={Boss}></Route>
//<Route path="/genius" compoent={Genius}></Route>