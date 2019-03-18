<template>
  <div class="login">
    <TopHeader title="登录"></TopHeader>

    <div class="logoBox">
      <i class="logo"></i>
    </div>

    <div class="form">
      <div class="item">
        <input
          type="text"
          placeholder="请输入手机号"
          maxlength="11"
          oninput="this.value=this.value.replace(/[^\d]/g, '')"
          v-model="phone"
          ref="phoneRef"
        >
        <i class="clear" v-show="phone.length>0" @click="onClear"></i>
      </div>
      <div class="item">
        <input
          type="text"
          placeholder="请输入验证码"
          maxlength="6"
          v-model="code"
          ref="codeRef"
        >
        <i class="send" :class="{ able: codeStyle }" @click="sendCode">{{codeMsg}}</i>
      </div>

      <div class="btn">
        <button
          :class="{ able: phone.length===11 && code.length===6 }"
          @click="onLogin"
        >登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, getUserInfo, getVerifyCode } from '@/api/login.js'
import { mapMutations } from 'vuex'
import TopHeader from '@/components/TopHeader/index.vue'

export default {
  components: { TopHeader },

  data () {
    return {
      phone: '',
      code: '',
      codeMsg: '获取验证码',
      codeAble: true // 控制获取验证码倒计时的点击事件
    }
  },

  computed: {
    codeStyle () {
      return (this.phone.length === 11) && this.codeAble
    }
  },

  methods: {
    ...mapMutations(['setUserName', 'setToken']),
    // 登录
    onLogin () {
      if (this.validatePhone()) return
      if (this.validateCode()) return
      // ajax
      this.ajaxLogin()
      this.ajaxGetUserInfo()
    },
    sendCode () {
      if (!this.codeAble) return
      if (this.validatePhone()) return
      this.$refs.codeRef.focus()
      // 倒计时
      this.codeMsg = 60 + '秒后重发'
      const timeStart = new Date().getTime()
      let timeId = setInterval(() => {
        const timeNow = new Date().getTime()
        const timeRemain = 60 - Math.floor((timeNow - timeStart) / 1000)
        if (timeRemain <= 0) {
          this.codeAble = true
          this.codeMsg = '获取验证码'
          clearInterval(timeId)
          return
        }
        this.codeMsg = timeRemain + '秒后重发'
      }, 1000)
      this.codeAble = false
      this.ajaxSendCode()
    },
    onClear () {
      this.phone = ''
      this.$refs.phoneRef.focus()
    },
    validatePhone () {
      if (this.phone.length < 11) {
        this.$toast('请输入11位手机号')
        this.$refs.phoneRef.focus()
        return true
      }
    },
    validateCode () {
      if (this.code.length < 6) {
        this.$toast('请输入6位验证码')
        this.$refs.codeRef.focus()
        return true
      }
    },
    // 登录接口
    async ajaxLogin () {
      const query = {
        username: this.phone,
        password: this.code
      }
      await userLogin(query).then(res => {
        if (res.data) {
          this.setToken(res.data.token)
          this.$toast.success('登录成功')
        }
      })
    },
    // 获取用户信息
    async ajaxGetUserInfo () {
      await getUserInfo().then(res => {
        if (res.data) {
          this.setUserName(res.data.userDo)
        }
      })
    },
    async ajaxSendCode () {
      const query = {
        username: this.phone,
        password: this.code
      }
      await getVerifyCode(query).then(res => {
        this.$toast('验证码已发送')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .logoBox {
    padding: 43px 0 70px;

    .logo {
      margin: 0 auto;
      width: 70px;
      height: 70px;
      background: url('https://img.51fanbei.com/h5/common/icon/app_main_icon.png') center no-repeat;
      background-size: contain;
    }
  }
  .form {
    padding: 0 23px;

    ::-webkit-input-placeholder {
      color: #ccc;
    }
    .item {
      position: relative;
      border-bottom: 1px solid #eee;
      margin-bottom: 21px;
      padding: 7px 0;

      input {
        width: 100%;
        height: 24px;
        line-height: 24px;
        font-size: 17px;
        color: #2E2E2E;
      }
      i {
        position: absolute;
        right: 0;
        top: 7px;
      }
      .clear {
        width: 20px;
        height: 20px;
        background: url('https://img.51fanbei.com/h5/common/icon/clearIcon.png') no-repeat center;
        background-size: 70%;
      }
      .send {
        height: 24px;
        line-height: 24px;
        background-color: #ddd;
        border-radius: 16px;
        color: #2E2E2E;
        font-size: 12px;
        padding: 0 13px;

        &.able {
          background-color: #FFD500;
          color: #fff;
        }
      }
    }
    .btn {
      padding-top: 30px;

      button {
        width: 100%;
        height: 43px;
        line-height: 43px;
        background-color: #ddd;
        border-radius:27px;
        color: #2E2E2E;
        font-size: 17px;

        &.able {
          background-color: #FFD500;
        }
      }
    }
  }
</style>
