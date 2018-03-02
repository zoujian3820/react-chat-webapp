/**
 * Created by Mrzou on 2017-12-29.
 */
import axios from 'axios'
import {Toast} from 'antd-mobile'

//拦截请求
axios.interceptors.request.use(config => {
  Toast.loading('加载中', 0)
  return config
})

//拦截响应
axios.interceptors.request.use(config=> {
  setTimeout(()=> {
    Toast.hide()
  }, 2000)
  return config
})