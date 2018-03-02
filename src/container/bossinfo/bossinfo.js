/**
 * Created by Mrzou on 2018/3/2.
 */
import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         title: ''
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
      return (
         <div>
            <NavBar
               mode="dark"
               leftContent="Back"
            >BOOS完善信息页面</NavBar>
            <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
            <InputItem onChange={v=>this.onChange('title', v)}>招聘职位</InputItem>
            <InputItem onChange={v=>this.onChange('company', v)}>公司名称</InputItem>
            <InputItem onChange={v=>this.onChange('money', v)}>职位薪资</InputItem>
            <TextareaItem autoHeight title="职位要求" rows={3} onChange={v=>this.onChange('desc', v)}></TextareaItem>
            <Button type="primary">保存</Button>
         </div>
      )
   }
}
export default BossInfo
