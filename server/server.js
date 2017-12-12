/**
 * Created by Mrzou on 2017-12-12.
 */
const express = require('express')
//新建App
const app = express()

app.get('/', function (req, res) { //请求，响应
  res.send('<h1>Hello world999</h1>')
})
app.get('/data',function(req,res){
  res.json({name:'zou',type:'computer'})
})
app.listen(9093, function () {
  console.log('node app start at port 9093')
})
