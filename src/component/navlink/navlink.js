/**
 * Created by Mrzou on 2018/3/6.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@connect(state=>state)
@withRouter
class NavLinkBar extends React.Component {
   static propTypes = {
      data: PropTypes.array.isRequired
   }

   render() {
      const navList = this.props.data.filter(v=>!v.hide)
      const {pathname} = this.props.location
      const Item = TabBar.Item

      return (
         <TabBar>
            {navList.map(v=>(
               <Item badge={v.path=='/msg'?this.props.chat.unread:0}
                     title={v.text} key={v.path} selected={pathname===v.path}
                     icon={{uri: require(`./img/${v.icon}.png`)}}
                     selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                     onPress={()=>{
                        this.props.history.push(v.path)
                     }}></Item>
            ))}
         </TabBar>
      )
   }
}

export default NavLinkBar