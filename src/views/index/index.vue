<template>
  <div class="index">
    <TopHeader title="首页"></TopHeader>

    <van-button @click="goPage('login')">登录</van-button>

  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader/index.vue'

export default {
  components: { TopHeader },

  methods: {
    goPage (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
