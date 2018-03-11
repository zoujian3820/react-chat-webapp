/**
 * Created by Mrzou on 2018/3/9.
 */
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'

const initState = {
   chatmsg: [],
   users: {},
   unread: 0
}

export function chat(state = initState, action) {
   switch (action.type) {
      case MSG_LIST:
         console.log(action)
         return {
            ...state,
            users: action.payload.users,
            chatmsg: action.payload.msgs,
            unread: action.payload.unread
         }
      case MSG_RECV:
         return {
            ...state,
            chatmsg: [...state.chatmsg, action.payload.msgs],
            unread: state.unread + action.payload.unread
         }
      case MSG_READ:
         const {from,userid,num} = action.payload
         return {
            ...state,
            //chatmsg: state.chatmsg.map(v=>({...v, read: v.from === from ? true : v.read})),
            chatmsg: state.chatmsg.map(v=>(v.from === from ? {...v, read: true} : v)),//清除的是发自对方用户发过来的消息，不是自己本身的，所以用form判断，不用to
            unread: state.unread - num
         }
      default:
         return state
   }
}

function msgList(msgs, users, unread) {
   return {
      type: MSG_LIST,
      payload: {msgs, users, unread}
   }
}

function msgRecv(msgs, unread) {
   return {
      type: MSG_RECV,
      payload: {msgs, unread}
   }
}

function msgRead({from,userid,num}) {
   return {
      type: MSG_READ,
      payload: {from, userid, num}
   }
}

export function readMsg(from) {
   return (dispatch, getState)=> {
      axios.post('/user/readmsg', {from}).then(res=> {
         const userid = getState().user._id

         if (res.status == 200 && res.data.code == 0) {
            //console.log(res.data)
            dispatch(msgRead({userid, from, num: res.data.num}))
         }
      })
   }
}

export function recvMsg() {
   return (dispatch, getState) => {
      socket.on('recvmsg', function (data) {
         let unread = data.to == getState().user._id ? 1 : 0
         dispatch(msgRecv(data, unread))

         console.log('recvmsg', data, unread)
      })
   }
}

export function sendMsg({from, to, msg}) {
   return dispatch => {
      socket.emit('sendmsg', {from, to, msg})
   }
}

export function getMsgList(state = initState, action) {
   return (dispatch, getState)=> {
      axios.get('/user/getmsglist').then(res=> {
         if (res.data.code == 0 && res.status == 200) {

            const userid = getState().user._id
            const unread = res.data.msgs.filter(v=> {
               return (!v.read && v.to == userid)
            }).length

            dispatch(msgList(res.data.msgs, res.data.users, unread))
         }
      })
   }
}