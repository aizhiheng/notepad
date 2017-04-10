// models/user.js
const db = require('../config/db.js'), 
      userModel = '../schema/user.js'; // 引入user的表结构
const TodolistDb = db.Todolist; // 引入数据库

const User = TodolistDb.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserById = async (id) => { // 注意是function* 而不是function 对于需要yield操作的函数都需要这种generator函数。
  const userInfo = await User.findOne({ // 用yield控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
    where: {
      id: id
    }
  });
  return userInfo // 返回数据
}

// 新增一个方法，通过用户名查找
const getUserByName = async (name) =>{
  const userInfo = await User.findOne({
    where: {
      user_name: name
    }
  })
  return userInfo
}

// 新增一个方法，通过用户名和邮箱查找
const getUserByNameAndEmail = async (name,email) =>{
  const userInfo = await User.findAll({
    where: {
      user_name: name,
	  email:email
    }
  })
  return userInfo
}

//新创建一个用户
const createUser = async (param) =>{
  const userInfo = await User.create({
      user_name: param.user_name,
      password: param.password,
      email: param.email,
      isvalidate:0
  });
  return userInfo
}

module.exports = {
  getUserById,  // 导出getUserById的方法，将会在controller里调用
  getUserByName,
  getUserByNameAndEmail,
  createUser
}