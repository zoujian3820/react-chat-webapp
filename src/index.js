import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
//import {counter,addGun,removeGun,addGunAsync} from './index.redux'
import {BrowserRouter, Route,Link, Redirect,Switch} from 'react-router-dom'
//import App from './App'
//import {counter} from './index.redux'
import reducers from './reducer'

import Auth from './Auth'
import Dashboard from './Dashboard'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : a=>a
))

console.log(store.getState())

function Erying() {
  return <h2>二营</h2>
}
function Qibinglian() {
  return <h2>骑兵连</h2>
}
//class Test extends React.Component {
//  constructor(props) {
//    super(props)
//  }
//
//  render() {
//    console.log(this.props)
//    //this.props.history.push('/')
//    return <h2>测试组件{this.props.match.params.location}</h2>
//  }
//}

/**
 * 登录
 *    没有登录信息 统一跳转到login
 *
 * 页面  导航+显示+注销
 *    一营
 *    二营
 *    骑兵连
 *
 * router+redux
 * **/

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {/*只渲染命中的第一个Route*/}
        {/**
         *<Route path="/" exact component={App}></Route> //exact 完全匹配才会跳转
         *<Route path="/erying" component={Erying}></Route>
         *<Route path="/:location" component={Test}></Route>
         *<Route path="/qibinglian" component={Qibinglian}></Route>
         *
         *<Redirect to="/qibinglian"></Redirect>  如果上面没有匹配的，如：(http://localhost:3000/fsdfwofo)
         * 将走这里直接跳转/qibinglian (上面必需要有相应的Route)
         **/}
        <Route path="/login" component={Auth}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Redirect to="/dashboard"></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
//<Route path="/:location" component={Test}></Route>
// 用来获取url路由的名称参数：如 this.props.match.params.location = 'qibinglian'

//function render() {
//  ReactDom.render(<App store={store} addGunAsync={addGunAsync} addGun={addGun}
//                       removeGun={removeGun}/>, document.getElementById('root'))
//}

//store.subscribe(render)
//render()
