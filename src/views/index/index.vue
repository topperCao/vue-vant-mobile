<template>
  <div class="index">
    <TopHeader title="首页"></TopHeader>

    <van-button @click="goPage('login')">登录</van-button>

    <div class="test">
      <button :class="['blue', { radius: flag }]">1</button>
      <my-child></my-child>
    </div>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader/index.vue'
import MyChild from './MyChild.vue'

export default {
  components: {
    TopHeader,
    MyChild
  },

  data () {
    return {
      flag: true
    }
  },

  methods: {
    goPage (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  margin-top: 20px;
  border: 1px solid #f9f9f9;
}

.blue {
  background-color: #409eff;
  padding: 5px 20px;
}
.radius {
  border-radius: 20px;
}
</style>
