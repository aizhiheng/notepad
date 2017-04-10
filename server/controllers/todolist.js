const todolist = require('../models/todolist.js');

const getTodolist = async (ctx,next) => { // 获取某个用户的所有todolist
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const result = await todolist.getTodolistById(id);  // 通过yield “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const createTodolist = async (ctx,next) => { // 给某个用户创建一条todolist
  const data = ctx.request.body; // post请求，数据是在request.body里的
  const result = await todolist.createTodolist(data);
  ctx.body = {
    success: true
  }
}

const removeTodolist = async (ctx,next) => {
  const id = ctx.params.id;
  const user_id = ctx.params.userId;
  const result = await todolist.removeTodolist(id,user_id);

  ctx.body = {
    success: true
  }
}

const updateTodolist = async (ctx,next) => {
  const id = ctx.params.id;
  const user_id = ctx.params.userId;
  let status = ctx.params.status; 
  status == '0' ? status = true : status =  false;// 状态反转（更新）

  const result = await todolist.updateTodolist(id,user_id,status);

  ctx.body = {
    success: true
  }
}

module.exports = (router) => {
  router.get('/todolist/:id', getTodolist),
  router.post('/todolist', createTodolist),
  router.delete('/todolist/:userId/:id', removeTodolist),
  router.put('/todolist/:userId/:id/:status', updateTodolist)
}