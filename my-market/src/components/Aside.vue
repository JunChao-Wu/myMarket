<template>
  <div>
    <div class="logo-main">
      <div class="logo-container">
        <h3 class="logo">超市管理系统</h3>
      </div>
    </div>
    <div class="tools-list-main">
      <div class="tools-list-container">
        <ul>
          <li v-for="item in controlList" :key="item.name">
            <router-link :to="/index/ + item.to">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import mimeDes from '../assets/mime/mimeDes.json';
export default {
  data() {
    return {
      managerControl: mimeDes,
      controlList: ''
    }
  },
  methods: {
    getKey: function() { /* 获取管理模块映射表数据（根据权限获取各模块以及其路由路径） */
      sessionStorage.setItem('level', 'senior')
      // let temp = []
      let level = sessionStorage.getItem('level')
      let managerTemp = this.managerControl
      for(let key in managerTemp) {
        if(key == level) {
          this.controlList = managerTemp[key]
        }
      }
    },

  },
  beforeMount() {
    this.getKey()
  },
}
</script>

<style lang="less" scoped>
@import '../assets/css/common.less';
.logo-main {
  width: 100%;
  line-height: 80px;
  .logo {
    margin: 0;
  }
}
.tools-list-main {
  box-sizing: border-box;
  padding: 30px 0;
  .tools-list-container {
    li {
      cursor: pointer;
      display: block;
      // box-sizing: border-box;
      line-height: 50px;
      // border-right: 4px solid transparent; /* @lbasecolor */
      &:hover {
        background-color: rgba(@basegray, 0.05);
        // border-right: 4px solid @lbasecolor;
      }
      a {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: block;
        color: @basegray;
        border-right: 4px solid transparent;
        &:hover {
          color: @lbasecolor;
          border-right: 4px solid @lbasecolor;
        }
        &.active {/* active类显示激活的routerlink样式 */
          color: @lbasecolor;
          border-right: 4px solid @lbasecolor;
        }
      }
    }
  }
}
</style>