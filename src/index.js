import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk' //react处理异步的action (action原先返回对象，现可以反回一个函数，然后异步手动dispatch)
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'

import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'


// 合并所有reducer 并且返回
//reducer.js
//import { combineReducers } from 'redux'
//import { user } from './redux/user.redux'
//
//export default combineReducers({user})

import reducers from './reducer'
import './config'
import './index.css'

import Login from './container/login/login'
import Register from './container/register/register'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : a=>a
))
   /**
    * user.redux.js
    * export function loadData(userinfo) {
       return {
          type: LOAD_DATA,
          payload: userinfo
       }
    * }
    *
    * import {loadData} from '../../redux/user.redux'
    * import {connect} from 'react-redux'
      @connect(
         state=>state.user,
         {loadData}
      )
    *
    * <Provider store={store}> store的注入，使其内部组件在调用由react-redux connect绑定到组件props属性上的方法(如：loadData)时，
    *  this.props.loadData(res.data.data)，会自动调用dispatch来触发reduce，所以user.redux.js中定义的action都要return回一个对象，
    *  等于 dispatch(loadData(userinfo)) = dispathc({type: LOAD_DATA,payload: userinfo})
    *
    *
    *
    * 异步手动dispatch
    * import thunk from 'redux-thunk' //react处理异步的action (action原先返回对象，现可以反回一个函数，然后异步手动dispatch)
    *
    *  如：user.redux.js
    *  export function update(data) {
            return dispatch=> {
               axios.post('/user/update', data).then(res=> {
                  if (res.status === 200 && res.data.code === 0) {
                     dispatch(authSuceess(res.data.data))
                  } else {
                     dispatch(errorMsg(res.data.msg))
                  }
               })
            }
         }
    *
    *  <Button onClick={()=>{this.props.update(this.state)}} type="primary">保存</Button>
    *
   **/


ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path="/bossinfo" component={BossInfo}></Route>
        <Route path="/geniusinfo" component={GeniusInfo}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)