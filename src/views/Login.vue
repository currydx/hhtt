<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      clearable
      @input="checkUsername"
      @clear="clearUsername"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      clearable
      @input="checkPassword"
      @clear="clearPassword"
    />
    <hm-button @click.native="startLogin">点击登录</hm-button>
    <div class="go-register">
      没有账号？去<router-link class="link" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameErrMsg: '',
      passwordErrMsg: '',
    }
  },
  created() {
    const { password, username } = this.$route.params
    if (password && username) {
      this.username = username
      this.password = password
    }
  },
  methods: {
    checkUsername() {
      const reg = /^1\d{3,5}$/
      if (reg.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式错误'
      }
    },
    checkPassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式错误'
      }
    },
    clearPassword() {
      this.passwordErrMsg = ''
    },
    clearUsername() {
      this.usernameErrMsg = ''
    },
    startLogin() {
      if (
        this.username !== '' &&
        this.password !== '' &&
        this.usernameErrMsg == '' &&
        this.passwordErrMsg == ''
      ) {
        this.$axios
          .post('/login', {
            username: this.username,
            password: this.password,
          })
          .then(res => {
            const { statusCode, message, data } = res.data
            //校验状态码
            if (statusCode === 200) {
              //保存token
              localStorage.setItem('token', data.token)
              localStorage.setItem('user_id', data.user.id)
              //提示
              this.$toast.success('登录成功')
              //跳转
              this.$router.push('/user')
            } else {
              this.$toast.fail('登录失败')
            }
          })
      } else {
        this.$toast.fail('校验失败')
      }
    },
  },
}
</script>

<style scoped lang="less">
.login {
  .go-register {
    text-align: center;
  }
}
</style>
