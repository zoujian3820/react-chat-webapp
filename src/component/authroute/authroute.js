/**
 * Created by Mrzou on 2018-1-23.
 */
import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(
   state=>state.user,
   {loadData}
)

class AuthRoute extends React.Component {
   componentDidMount() {
      //获取用户信息
      //是否登录
      //现在的url地址  login是不需要跳转的
      //用户的type 身份是boss还是牛人
      //用户是否完善信息（选择头像 个人简介）
      const publickList = ['/login', '/register']
      const pathname = this.props.history.location.pathname
      if (~publickList.indexOf(pathname)) return null;

      axios.get('/user/info').then(res=> {
         if (res.status === 200) {
            if (res.data.code === 0) {
               //有登录信息
               //dispatch当前后台返回的用户信息与当前reduce state合并，触发组件数据更新
               this.props.loadData(res.data.data)
            } else {
               this.props.history.push('/login')
               console.log(this.props)
            }
            //console.log(res.data)
         }
      }).catch(res=> {
         console.log(res)
      })
   }

   render() {
      return null
   }
}

export default AuthRoute