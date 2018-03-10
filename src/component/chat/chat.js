/**
 * Created by Mrzou on 2018/3/8.
 */
import React from 'react'
import {connect} from 'react-redux'
import {List,InputItem,NavBar,Toast,Icon,Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
import {isEmptyObject,getChatId} from '../../util'

const socket = io('ws://localhost:9093')

@connect(
   state=>state,
   {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         text: '',
         showEmoji: false
         //msg: []
      }
   }

   componentDidMount() {
      const chat = this.props.chat
      if (!chat.chatmsg.length && isEmptyObject(chat.users)) {
         this.props.getMsgList()
         this.props.recvMsg()
      }

      this.fixCarousel()
      //socket.on('recvmsg', function (data) {
      //   console.log(data)
      //   this.setState({
      //      msg: [...this.state.msg, data.text]
      //   })
      //}.bind(this))
   }

   fixCarousel() {
      setTimeout(()=> {
         window.dispatchEvent(new Event('resize'))
      }, 20)
   }

   handleSubmit() {
      //socket.emit('sendmsg', {text: this.state.text})
      const from = this.props.user._id
      const to = this.props.match.params.user
      const msg = this.state.text;
      msg ? this.props.sendMsg({from, to, msg}) : Toast.info('请输入内容!!', 1)
      this.setState({
         text: '',
         showEmoji: !this.state.showEmoji
      })
      //console.log(this)
   }

   render() {
      // console.log(this)
      const emoji = '👸 🎉 🎂 💣 🐷 😁 😂 🐰 😢 🌄 🐤 😭 😱 😠 😈 💀 👻 👽 👦 🎥 👧 👮 👠 🌂 👼 🎓 👌 👍 👏 👙 💍 💄 🐨 🌼 🌾 🍀'.split(' ')
         .filter(v=>v).map(v=>({text: v}));

      const userid = this.props.match.params.user
      const Item = List.Item
      const users = this.props.chat.users
      if (!users[userid]) return null;

      const chatid = getChatId(userid, this.props.user._id)
      const chatmsgs = this.props.chat.chatmsg.filter(v=> {
         return v.chatid == chatid
      })

      return (
         <div id="chat-page">
            <NavBar mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={()=>this.props.history.goBack()}>
               {users[userid].name}
            </NavBar>
            {chatmsgs.map(v=> {
               const avatar = require(`../img/${users[v.from].avatar}.png`)
               return v.from == userid
                  ? (<List key={v._id}><Item thumb={avatar}>{v.content}</Item></List>)
                  : (<List key={v._id}><Item extra={<img src={avatar} />} className="chat-me">{v.content}</Item></List>)
            })}
            <div className="stick-footer">
               <List>
                  <InputItem
                     placeholder="请输入" value={this.state.text}
                     onChange={v=>{this.setState({text:v})}}
                     extra={
                        <div>
                           <span onClick={()=>{
                              this.setState({showEmoji:!this.state.showEmoji})
                              this.fixCarousel()
                           }} style={{marginRight:15}}>😁</span>

                           <span onClick={()=>this.handleSubmit()}>发送</span>
                        </div>
                     }
                  />
               </List>

               {this.state.showEmoji ?
                  <Grid
                     data={emoji}
                     columnNum={9}
                     carouselMaxRow={3}
                     isCarousel={true}
                     onClick={el=>{
                         console.log(el)
                         this.setState({
                           text: this.state.text + el.text
                         })
                       }}
                  /> : null}

            </div>
         </div>
      )
   }
}

export default Chat