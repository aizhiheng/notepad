<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">notepad</span>
      <el-row>
        <el-input v-model="account" placeholder="账号" type="text"></el-input>
        <el-input v-model="email" placeholder="邮箱" type="text"></el-input>
        <el-input v-model="password" placeholder="密码" type="password" @keyup.enter.native="loginToDo"></el-input>
        <el-button type="primary" @click="loginToDo">登录</el-button>
        <div><el-button type="primary" @click="register">注册</el-button></div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import md5 from 'md5'

export default {
  data () {
    return {
      account: '',
      email: '',
      password: ''
    }
  },
  methods: {
    loginToDo () {
      let obj = {
        name: this.account,
        password: md5(this.password) // md5加密
      }
      if (this.account === '') {
        this.$message.error('请输入账号!')
        return false
      }
      if (this.password === '') {
        this.$message.error('请输入密码!')
        return false
      }
      this.$http.post('/auth/user', obj) // 将信息发送给后端
        .then((res) => {
          if (res.data.success) { // 如果成功
            sessionStorage.setItem('demo-token', res.data.token) // 用sessionStorage把token存下来
            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: '登录成功！'
            })
            this.$router.push('/todolist') // 进入todolist页面，登录成功
          } else {
            this.$message.error(res.data.info) // 登录失败，显示提示语
            sessionStorage.setItem('demo-token', null) // 将token清空
          }
        }, (err) => {
          console.log(err)
          this.$message.error('请求错误！')
          sessionStorage.setItem('demo-token', null) // 将token清空
        })
    },
    register () {
      let params = {
        name: this.account,
        email: this.email,
        password: md5(this.password) // md5加密
      }
      if (this.account === '' || this.email === '' || this.password === '') {
        this.$message.error('请输入完整的账户信息!')
        return false
      }
      this.$http.post('/auth/createAccount', params)
        .then(response => {
          if (response.data.success) { // 如果成功
            this.$message(response.data.info)
          } else {
            this.$message.error(response.data.info)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
</style>
