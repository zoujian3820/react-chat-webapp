/**
 * Created by Mrzou on 2018/3/7.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
   static propTypes = {
      userList: PropTypes.array.isRequired
   }

   handleClick(v) {
      //console.log(this)
      this.props.history.push(`/chat/${v._id}`)
   }

   render() {
      const Header = Card.Header
      const Body = Card.Body
      return (
         <WingBlank>
            <WhiteSpace></WhiteSpace>
            {this.props.userList.map(v=>(
               v.avatar ? <Card className="card_margin_bottom" key={v._id} onClick={()=>this.handleClick(v)}>
                  <Header
                     title={v.user}
                     thumb={require(`../img/${v.avatar}.png`)}
                     extra={<span>{v.title}</span>}
                  ></Header>
                  <Body>
                  {(v.type == 'boss') && <div>公司：{v.company}</div>}
                  {v.desc.split('\n').map(y=>(<div key={y}>{y}</div>))}
                  {v.type == 'boss' ? <div>薪资：{v.money}</div> : null}
                  </Body>
               </Card> : null
            ))}
         </WingBlank>
      )
   }
}

export default UserCard