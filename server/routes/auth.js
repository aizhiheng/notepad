const user = require('../controllers/user.js'); 
const router = require('koa-router')();

user.auth(router); // 用user的auth方法引入router

module.exports = router; // 把router规则暴露出去