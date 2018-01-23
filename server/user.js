/**
 * Created by Mrzou on 2018-1-23.
 */
const express = require('express')
const Router = express.Router()

Router.get('/info', (req, res)=> {
  //用户有没有cookie
  return res.json({code: 1})
})

module.exports = Router
