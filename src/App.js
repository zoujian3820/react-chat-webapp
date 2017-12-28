/**
 * Created by Mrzou on 2017-12-25.
 */
import React from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from './index.redux'

//const mapStatetoProps = (state)=> {
//  return {num: state}
//}
//const actionCreators = {addGun, removeGun, addGunAsync}
//App = connect(mapStatetoProps, actionCreators)(App)
@connect(
  state=>({num:state.counter}),//你要什么属性放到props中
  {addGun, removeGun, addGunAsync}//你要什么方法，放到props中，自动dispatch
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val: 10
    }
  }

  render() {
    return (
      <div>
        <h1>现在有机枪{this.props.num}把</h1>
        <button onClick={this.props.addGun}>申请武器</button>
        <button onClick={this.props.removeGun}>回收武器</button>
        <button onClick={this.props.addGunAsync}>拖两天再给</button>
      </div>
    )
  }
}

//const actionCreators = {
//  addGun:addGun,
//  removeGun:removeGun,
//  addGunAsync:addGunAsync
//}
//ES6语法特性--简写
//const actionCreators = {addGun, removeGun, addGunAsync}

export default App