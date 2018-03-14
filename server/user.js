/**
 * Created by Mrzou on 2018-1-23.
 */
const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function (req, res) {
   // User.remove({}, (err, doc)=> {})

   //练习的CORS跨域接口
   res.header('Access-Control-Allow-Origin', '*');        // * 这个表示任意域名都可以访问，这样写不能携带cookie了。 || 'http://localhost:5080'

   res.header('Access-Control-Allow-Credentials', true);  // 允许服务器端发送Cookie数据,
                                                          // 若前端上axios.defaults.withCredentials = true设置为true了，
                                                          // 则Access-Control-Allow-Credentials必须为true,否则会请求失败，报错
   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');//它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  //设置方法

   /* 前端请求代码
    * import axios from 'axios'
    * axios.defaults.withCredentials = true
    *
    * axios.get('http://localhost:9093/user/list?type=boss').then((res)=> {
    *   console.log(res)
    * }).catch(error=>{
    *   console.log('跨域error',error)
    * })
    */


   if (req.method == 'OPTIONS') {
      res.send(200);   //在正常的请求之前，会发送一个验证，是否可以请求。
   } else {
      const {type} = req.query
      User.find({type}, function (err, doc) {
         return res.json({code: 0, data: doc})
      })
   }


})


Router.get('/getmsglist', function (req, res) {
   //Chat.remove({}, (err, doc)=> {})
   const userid = req.cookies.userid

   User.find({}, _filter, function (err, userdoc) {
      let users = {}
      userdoc.forEach((obj, index)=> {
         users[obj._id] = {name: obj.user, avatar: obj.avatar}
      })

      Chat.find({'$or': [{"from": userid}, {"to": userid}]}, {'__v': 0}, function (err, doc) {
         if (!err) {
            return res.json({code: 0, msgs: doc, users: users})
         }
      })
   })
})

Router.post('/readmsg', function (req, res) {
   const userid = req.cookies.userid
   //if (!userid) {
   //   return json.dumps({code: 1})
   //}
   const {from} = req.body
   console.log(from, userid)
   Chat.update(
      {from, to: userid},
      {'$set': {read: true}},
      {'multi': true},//multi修改多行
      function (err, doc) {
         console.log(doc)
         if (!err) {
            return res.json({code: 0, num: doc.nModified})
         }
         return res.json({code: 1, msg: '修改失败'})
      })
})


Router.post('/update', function (req, res) {
   const userid = req.cookies.userid
   if (!userid) {
      return json.dumps({code: 1})
   }
   const body = req.body
   User.findByIdAndUpdate(userid, body, function (err, doc) {
      const data = Object.assign({}, {
         user: doc.user,
         type: doc.type
      }, body)
      return res.json({code: 0, data})
   })
})

Router.post('/login', function (req, res) {
   const {user,pwd} = req.body
   User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
      if (!doc) {
         return res.json({code: 1, msg: '用户名或密码错误'})
      }
      res.cookie('userid', doc._id)
      return res.json({code: 0, data: doc})
   })
})

Router.post('/register', function (req, res) {
   //console.log('server',req)
   const {user, pwd, type} = req.body
   User.findOne({user: user}, (err, doc)=> {
      if (doc) {
         return res.json({code: 1, msg: '用户名重复'})
      }

      const userModel = new User({user, type, pwd: md5Pwd(pwd)})
      userModel.save(function (e, d) {//用save方法可返回数据创建的_id，create方法无法返回
         if (e) {
            return res.json({code: 1, msg: '后端出错了'})
         }
         const {user,type,_id} = d
         res.cookie('userid', _id)
         return res.json({code: 0, data: {user, type, _id}})
      })

      //User.create({user, pwd: md5Pwd(pwd), type}, function (e, d) {
      //   if (e) {
      //      return res.json({code: 1, msg: '后端出错了'})
      //   }
      //   return res.json({code: 0})
      //})
   })
})

Router.get('/info', (req, res)=> {
   const {userid} = req.cookies
   if (!userid) {
      return res.json({code: 1})
   }
   User.findOne({_id: userid}, _filter, function (err, doc) {
      if (err) {
         return res.json({code: 1, msg: '后端出错了'})
      }
      if (doc) {
         return res.json({code: 0, data: doc})
      }
   })
   //用户有没有cookie
})

//md5加严
function md5Pwd(pwd) {
   const salt = 'md5JaYan_Auhor:MrZou?!!goodGoodStudy@my.Computed~~SiRact--2018--02';
   return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
