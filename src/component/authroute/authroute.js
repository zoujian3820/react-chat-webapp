/**
 * Created by Mrzou on 2018-1-23.
 */
import React from 'react'
import axios from 'axios'

class AuthRoute extends React.Component {
  componentDidMount() {
    //获取用户信息
    //是否登录
    //现在的url地址  login是不需要跳转的
    //用户的type 身份是boss还是牛人
    //用户是否完善信息（选择头像 个人简介）
    axios.get('/user/info').then(res=> {
      console.log(res)
      if (res.status == 200) {
        console.log(res.data)
      }
    }).catch(res=>{
      console.log(res)
    })
  }

  render() {
    return <p>检测跳转的组件</p>
  }
}

export default AuthRoute