/**
 * Created by Mrzou on 2018/3/7.
 */
import React from 'react'
//import axios from 'axios'
//import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
   state=>state.chatuser,
   {getUserList}
)
class Boss extends React.Component {
   //constructor(props) {
   //   super(props)
   //   this.state = {
   //      data: []
   //   }
   //}

   componentDidMount() {
      this.props.getUserList('genius')
      //axios.get('/user/list?type=genius').then(res=> {
      //   if (res.data.code == 0) {
      //      this.setState({data: res.data.data})
      //   }
      //})
   }

   render() {
      return (<UserCard userList={this.props.userList}></UserCard>
      )
   }
}

//<WingBlank>
//   <WhiteSpace></WhiteSpace>
//   {this.props.userList.map(v=>(
//      v.avatar ? <Card className="card_margin_bottom" key={v._id}>
//         <Header
//            title={v.user}
//            thumb={require(`../img/${v.avatar}.png`)}
//            extra={<span>{v.title}</span>}
//         ></Header>
//         <Body>
//         {v.desc.split('\n').map(y=>(<div key={y}>{y}</div>))}
//         </Body>
//      </Card> : null
//   ))}
//</WingBlank>

export default Boss