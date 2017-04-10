const todolist = require('../controllers/todolist.js');
const router = require('koa-router')();

todolist(router); // 引入koa-router

module.exports = router; // 导出router规则