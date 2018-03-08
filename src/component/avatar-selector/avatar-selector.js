/**
 * Created by Mrzou on 2018/3/2.
 */

import React from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
   static propTypes = {
      selectAvatar: PropTypes.func.isRequired
   }

   constructor(props) {
      super(props)
      this.state = {}
   }

   selectAvatar(ele) {
      this.setState(ele)
      this.props.selectAvatar(ele.text)
   }

   render() {
      const avatarList = 'man,woman,boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
         .split(',').map(v=>({
            icon: require(`../img/${v}.png`),
            text: v
         }))

      const gridHeader = this.state.text
         ? (<div>
         <span>已选择头像</span>
         <img src={this.state.icon} style={{width:20}}/>
      </div>)
         : '请选择头像'

      return (
         <div>
            <List renderHeader={()=>gridHeader}>
               <Grid data={avatarList} columnNum={5} onClick={ele=>this.selectAvatar(ele)}/>
            </List>
         </div>
      )
   }
}
export default AvatarSelector