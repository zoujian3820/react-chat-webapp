/**
 * Created by Mrzou on 2018/3/5.
 */

import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(
   state=>state.user,
   {update}
)

class GeniusInfo extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         title: '',
         desc: ''
      }

      this.selectAvatar = this.selectAvatar.bind(this)
   }

   onChange(key, val) {
      this.setState({
         [key]: val
      })
   }

   selectAvatar(imgname) {
      this.setState({
         avatar: imgname
      })
   }

   render() {
      const path = this.props.location.pathname
      const redirect = this.props.redirectTo
      //console.log('props', this.props)
      return (
         <div>
            {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : null}
            <NavBar mode="dark" leftContent="Back">牛人完善信息页面</NavBar>
            <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
            <InputItem onChange={v=>this.onChange('title', v)}>求职岗位</InputItem>
            <TextareaItem autoHeight title="个人简介" rows={3} onChange={v=>this.onChange('desc', v)}></TextareaItem>
            <Button
               onClick={()=>{
                  this.props.update(this.state)
               }}
               type="primary">保存</Button>

         </div>
      )
   }
}
export default GeniusInfo
