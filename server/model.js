/**
 * Created by Mrzou on 2018-1-23.
 */

const mongoose = require('mongoose')
//链接数据库，并使用imooc-chat这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL)

const models = {
   user: {
      'user': {type: String, require: true},
      'pwd': {type: String, require: true},
      'type': {type: String, require: true},
      //头像
      'avatar': {type: String},
      //个人简介或职位简介
      'desc': {type: String},
      //职位名
      'title': {type: String},
      //如果你是boss, 还有两个字段
      'company': {type: String}, //公司
      'money': {type: String}//职位给多少钱
   },
   chat: {
      'chatid': {type: String, require: true},
      'from': {type: String, require: true},
      'to': {type: String, require: true},
      'read': {type: Boolean, default: false},
      'content': {type: String, require: true, default: ''},
      'create_time': {type: Number, default: new Date().getTime()}
   }
}

for (let m in models) {
   mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
   getModel: function (name) {
      return mongoose.model(name)
   }
}