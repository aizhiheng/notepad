const user = require('../models/user.js')
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

const getUserInfo = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await user.getUserById(id) // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const postUserAuth = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await user.getUserByName(data.name)
  if (userInfo != null) { // 如果查无此用户会返回null
    if (userInfo.password != data.password) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo' // 指定密钥
      const token = jwt.sign(userToken, secret) // 签发token
      ctx.body = {
        success: true,
        token: token // 返回token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}

//创建用户
const createAccount = async (ctx, next) => {
    let name = ctx.request.body.name;
    let password = ctx.request.body.password;
    let email = ctx.request.body.email;
	try {
        //验证邮箱是否存在
        var rGuser = await user.getUserByNameAndEmail(name,email);
        if(rGuser.length>0){
			ctx.body = {
                success: false,
                info: '此用户已存在！' // 如果用户不存在返回用户不存在
            }
            return;
        };
        //创建用户，设置未激活
        await user.createUser({
            user_name: name,
            password: password,
            email: email,
            isvalidate:0
        });
        //发送邮箱
        let transporter = nodemailer.createTransport({
            service: 'QQ',
            auth: {
                user: '1712560167@qq.com',
                pass: 'cgzzckqudalvfchh'
            }
        });
        //生成激活token
        var content = { msg: email };
        var secretOrPrivateKey = "vue-koa-demo";
        var token = jwt.sign(content, secretOrPrivateKey, {
            expiresIn: 60*60*15
        });

        //设置邮件内容
        let mailOptions = {
            from: '1712560167@qq.com', // sender address
            to: email, // list of receivers
            subject: '记事本 激活邮件', // Subject line
            text: '记事本 激活邮件', // plain text body
            html: '<a href="http://127.0.0.1:8889/auth/isvalidate/token/'+token+'">猛戳激活</a>'
        };
        //发送邮件
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
		ctx.body = {
            success: true,
            info: '邮件发送成功,请激活' // 如果用户不存在返回用户不存在
        }
    } catch (err) {
        console.log(err);
    }
}
//用户邮箱验证
const isValidate = async (ctx, next) => {
	var success;
	var message;
    //解析token
    try {
        var decoded = jwt.verify(ctx.params.token, "vue-koa-demo");
    } catch (err) {
        console.log(err);
		success = false;
        message = "链接已失效"
    }
	
    //认证成功修改用户状态为1
    try {
        user.updateStatus({
            isvalidate: 1,
            email: decoded.msg
        });
		success = true;
        message = "激活成功";
    } catch (err) {
        console.log(err);
		success = false;
        message = "激活失败";
    } 
	ctx.body = "<a href='http://127.0.0.1:8889'>"+message+"，点击返回首页"+"</a>";
}

module.exports =  {
  getUserInfo,
  postUserAuth,
  createAccount,
  isValidate
}
