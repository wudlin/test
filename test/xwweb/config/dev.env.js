'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  COMPILE_DATE: '"'+(new Date()).toLocaleString()+'"',
  API_URL: '"/xwweb"',
  LOGIN_URL:'"http://user.xwshidai.com/common/captcha"',
  
})
