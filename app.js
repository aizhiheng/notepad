const Koa = require('koa');
const koa = require('koa-router')();
const bodyparse = require('koa-bodyparser');
const json = require('koa-json');
const logger = require('koa-logger');
const auth = require('./server/routes/auth.js'); // 引入auth
const api = require('./server/routes/api.js');
const jwt = require('koa-jwt');
const path =require('path');
const serve = require('koa-static');
const historyApiFallback = require('koa-history-api-fallback'); // 引入依赖
const app = new Koa();

app.use(bodyparse());
app.use(json());
app.use(logger());

//记录url及页面执行时间
app.use(async (ctx, next) => {
    var start = new Date();
    await next();
    var ms = new Date()-start;
    console.log(`${ctx.method} ${ctx.url}`, `${ms}ms`);
});

app.use((ctx, next) => {
  return next().catch(err => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = '401 Unauthorized - Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

app.on('error', function(err, ctx){
  console.log('server error', err);
});

koa.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
koa.use(jwt({secret: 'vue-koa-demo'}).unless({ path: [/^\/api/] }),api.routes()); // 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致
app.use(koa.routes()); // 将路由规则挂载到Koa上。

app.use(historyApiFallback()); // 将这两个中间件挂载在api的路由之后
// 静态文件serve在koa-router的其他规则之上
app.use(serve(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.listen(8088,() => {
  console.log('Koa is listening in 8088');
});

module.exports = app;




