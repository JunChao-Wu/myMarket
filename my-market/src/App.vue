<template>
  <div id="app">
    <router-view/>
    <!-- <router-link class="link" to="/index">Home</router-link> |
    <router-link class="link" to="/about">About</router-link> -->
  </div>
</template>

<script>
import './assets/css/base.less';/* 公共类库 */
export default {
  mounted() {
  },
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media (max-width: 1198px) {
  body.aside_show:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 799;
    background-color: #000;
    opacity: 0.5;
  }
}
</style>
