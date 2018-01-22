/**
 * Created by Mrzou on 2017-12-27.
 */
import React from 'react'
import {connect} from 'react-redux'
import {login} from './Auth.redux'
import {Redirect} from 'react-router-dom'

//两个reducers, 每一个reducers都有一个state
//合并reducers
@connect(
  state=>state.auth, {login}
)

class Auth extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.isAuth && <Redirect to="/dashboard"/>}
        <h2>你没有权限，需要登录才能看</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth