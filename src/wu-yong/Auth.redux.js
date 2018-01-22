/**
 * Created by Mrzou on 2017-12-27.
 */
import axios from 'axios'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'
const initState = {
  isAuth: false,
  user: '李云龙',
  age: 20
}

export function auth(state = initState, action) {
  console.log(state, action)
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {isAuth: true})
    case LOGOUT:
      return {...state, isAuth: false}
    case USER_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}

export function getUserData() {
  //dispatch用来通知数据修改
  return dispatch=> {
    axios.get('/data').then((res)=> {
      dispatch(UserData(res.data))
      //this.setState({data: res.data})
    })
  }
}
export function UserData(data) {
  return {type: USER_DATA, payload: data}
}
export function login() {
  return {type: LOGIN}
}
export function logout() {
  return {type: LOGOUT}
}