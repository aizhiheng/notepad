const db = require('../config/db.js'), 
      todoModel = '../schema/list.js'; // 引入todolist的表结构
const TodolistDb = db.Todolist; // 引入数据库

const Todolist = TodolistDb.import(todoModel); 

const getTodolistById = async (id) => {  // 获取某个用户的全部todolist
  const todolist = await Todolist.findAll({ // 查找全部的todolist
    where: {
      user_id: id
    },
    attributes: ['id','content','status'] // 只需返回这三个字段的结果即可
  });

  return todolist // 返回数据
}

const createTodolist = async (data) => { // 给某个用户创建一条todolist
  await Todolist.create({
    user_id: data.id, // 用户的id，用来确定给哪个用户创建
    content: data.content,
    status: data.status 
  })
  return true
}

const removeTodolist = async (id,user_id) => {
  await Todolist.destroy({
    where: {
      id,
      user_id
    }
  })
  return true
}

const updateTodolist = async (id,user_id,status) => {
  await Todolist.update(
    {
      status
    },{
      where: {
        id,
        user_id
      }
    }
  )
  return true
}

module.exports = {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}