import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk' //react处理异步的action (action原先返回对象，现可以反回一个函数，然后异步手动dispatch)
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Redirect,Switch} from 'react-router-dom'

import reducers from './reducer'
import './config'

import Login from './container/login/login'
import Register from './container/register/register'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : a=>a
))

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)