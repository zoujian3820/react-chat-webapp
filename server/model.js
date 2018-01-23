/**
 * Created by Mrzou on 2018-1-23.
 */

const mongoose = require('mongoose')
//链接数据库，并使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
