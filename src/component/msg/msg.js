/**
 * Created by Mrzou on 2018/3/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
   state=>state
)
class Msg extends React.Component {
   getLastMsg(arr) {
      return arr[arr.length - 1]
   }

   render() {
      const Item = List.Item
      const Brief = Item.Brief
      const msgGroup = {}
      const userId = this.props.user._id
      const users = this.props.chat.users

      //const msgGroup = {length: 0}
      this.props.chat.chatmsg.forEach((v, i)=> {
         // msgGroup.length = !msgGroup[v.chatid] ? (msgGroup.length + 1) : msgGroup.length
         msgGroup[v.chatid] = msgGroup[v.chatid] || []
         msgGroup[v.chatid].push(v)
      })

      //const chatList = Object.values(msgGroup) Object.values es7有兼容问题
      const chatList = []
      for (let key in msgGroup) {
         chatList.push(msgGroup[key])
      }

      //按创建的时间进行降序排序，把最新消息放在顶部
      chatList.sort((a, b)=>this.getLastMsg(b).create_time - this.getLastMsg(a).create_time)

      console.log(chatList)

      return (
         <div>

            {
               chatList.map(v=> {
                  const lastMsg = this.getLastMsg(v)
                  const targetId = lastMsg.to !== userId ? lastMsg.to : lastMsg.from
                  const unreadNum = v.filter(v=>!v.read && v.to === userId).length

                  if (!users[targetId]) return null;

                  return (
                     <List key={v[0]._id}>
                        <Item extra={<Badge text={unreadNum}></Badge>} arrow="horizontal"
                              thumb={<img src={require(`../img/${users[targetId].avatar}.png`)} alt=""/>}
                              onClick={()=>{
                                       this.props.history.push(`/chat/${targetId}`)
                                  }}>
                           {this.getLastMsg(v).content}
                           <Brief>{users[targetId].name}</Brief>
                        </Item>
                     </List>
                  )
               })
            }

         </div>
      )
   }
}

export default Msg