<template>
  <div class="hm-button">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hm-button {
  height: 50px;
  line-height: 50px;
  background: red;
  margin: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  border-radius: 25px;
  color: #fff;
}
</style>
