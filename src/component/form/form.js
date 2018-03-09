/**
 * Created by Mrzou on 2018/3/8.
 */
import React from 'react'

export default function compForm(Comp) {
   return class WrapperComp extends React.Component {
      constructor(props) {
         super(props)
         this.state = {}
         this.handleChange = this.handleChange.bind(this)
      }

      handleChange(key, val) {
         this.setState({
            [key]: val
         })
      }

      render() {
         return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
      }
   }
}
