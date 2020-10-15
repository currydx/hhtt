<template>
  <div class="hm-header">
    <div class="left">
      <i
        class="iconfont iconjiantou2"
        @click="$router.back()"
        v-if="$route.path !== '/login'"
      ></i>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hm-header {
  height: 40px;
  display: flex;
  border-bottom: 1px solid #ccc;
  text-align: center;
  align-items: center;
  background: #f4f4f4;
  .left,
  .right {
    width: 30px;
  }
  .center {
    flex: 1;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
