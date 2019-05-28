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
          :type="pwdType"
          placeholder="请输入密码"
          maxlength="16"
          v-model="pwd"
          ref="pwdRef"
          autocomplete="new-password"
        >
        <i class="isHide" @click="pwdType = pwdType==='password' ? 'text' : 'password'"></i>
      </div>

      <div class="btn">
        <button
          :class="{ able: phone.length===11 && pwd.length>0 }"
          @click="onLogin"
        >登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, getUserInfo } from '@/api/login.js'
import { mapMutations } from 'vuex'
import TopHeader from '@/components/TopHeader/index.vue'

export default {
  components: { TopHeader },

  data () {
    return {
      phone: '',
      pwd: '',
      pwdType: 'password'
    }
  },

  methods: {
    ...mapMutations(['setUserName', 'setToken']),
    // 登录
    async onLogin () {
      if (this.validatePhone()) return
      if (this.validatePwd()) return
      // ajax
      const query = {
        username: this.phone,
        password: this.pwd
      }
      await userLogin(query).then(res => {
        if (res.data) {
          this.setToken(res.data.token)
          this.$toast.success('登录成功')
        }
      })
      await getUserInfo().then(res => {
        if (res.data) {
          this.setUserName(res.data.userDo)
          // 登录跳转
          let redirect = this.$route.query.redirect
          if (redirect) {
            delete this.$route.query.redirect
            this.$router.replace({
              name: redirect,
              query: this.$route.query
            })
          } else {
            this.$router.replace({ name: 'index' })
          }
        }
      })
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
    validatePwd () {
      if (this.pwd.length === 0) {
        this.$toast('请输入密码')
        this.$refs.pwdRef.focus()
        return true
      }
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
      background: url('') center no-repeat;
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

        &:-webkit-autofill {
          box-shadow: none;
          -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
          -webkit-text-fill-color: #2E2E2E !important;
        }
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
        background-size: 60%;
      }
      .isHide {
        width: 20px;
        height: 20px;
        background: url('https://img.51fanbei.com/h5/common/icon/blackDian.png') no-repeat center;
        background-size: 60%;
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
