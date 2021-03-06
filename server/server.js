/**
 * Created by Mrzou on 2017-12-12.
 */
//const express = require('express')
//const mongoose = require('mongoose')
//链接mongo
//const DB_URL = 'mongodb://127.0.0.1:27017'
//const DB_URL = 'mongodb://localhost:27017/imooc'
//
////需先开启mongodb服务器cmd > net start MongoDB
//mongoose.connect(DB_URL)
//
//mongoose.connection.on('connected', function () {
//  console.log('mongo connect success')
//})

//类似于mysql的表 mongo里有文档、字段的概念
//const User = mongoose.model('user', new mongoose.Schema({
//  user: {type: String, require: true},
//  age: {type: Number, require: true}
//}))

//新增数据
//User.create({
//  user: 'xiaoming',
//  age: 21
//}, function (err, doc) {
//  if (!err) {
//    console.log(doc)
//  } else {
//    console.log(err)
//  }
//})

//删除age:18的所有数据
//User.remove({age: 18}, (err, doc)=> {
//  console.log(doc)
//})

//修改数据
//User.update({'user': 'mrzou'}, {'$set': {age: 16}}, (err, doc)=> {
//  console.log(doc)
//})

//新建App
//const app = express()

//app.get('/', function (req, res) { //请求，响应
//  res.send('<h1>Hello world</h1>')
//})
//app.get('/data', function (req, res) {
//  //查询mongodb数据库数据
//  //User.find({}, function (err, doc) {
//  //  res.json(doc) //无条件查询所有数据,返回[{xx:aa},{rr:bb}]集合结构数据
//  //})
//  User.find({user:'xiaoming'}, function (err, doc) {
//    res.json(doc) //条件查询user:'xiaoming'的数据,返回[{xx:aa},{rr:bb}]集合结构数据
//  })
//  //User.findOne({user:'xiaoming'}, function (err, doc) {
//  //  res.json(doc) //findOne只查询一条，查到就返回，且返回结构为{rr:bb}单条数据
//  //})
//})
//app.listen(9093, function () {
//  console.log('node app start at port 9093')
//})

const express = require('express')
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')
const app = express() //新建App
const model = require('./model')
const Chat = model.getModel('chat')

//work with express (socket.io关联express)
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function (socket) {
   console.log('user login')
   socket.on('sendmsg', function (data) {
      //console.log(data)
      //io.emit('recvmsg', data) //服务器端派发一个全局事件'recvmsg'
      const {from,to,msg} = data
      const chatid = [from, to].sort().join('_')
      Chat.create({chatid, from, to, content: msg}, function (err, doc) {
         console.log(doc._doc)
         io.emit('recvmsg',Object.assign({},doc._doc))
      })

   })
})


const userRouter = require('./user')

app.use(cookParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

app.get('/', function (req, res) { //请求，响应
   res.send('<h1>Hello world</h1>')
})

//app.listen(9093, function () {
//   console.log('node app start at port 9093')
//})

server.listen(9093, function () {
   console.log('node app start at port 9093')
})