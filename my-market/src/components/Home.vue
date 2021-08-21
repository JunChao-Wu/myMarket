<template>
  <div class="home">
    <div class="aside-left">
      <div class="aside-main">
        <Aside></Aside>
      </div>
    </div>
    <div class="nav-top">
      <div class="top-main">
        <span class="menu iconfont icon-daohang2" @click.stop="showMenu"></span>
        <TopBar></TopBar>
      </div>
    </div>
    <div class="main-container col-main-container-change">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Aside from './Aside';
import TopBar from './TopBar';
export default {
  name: 'Home',

  components: {
    Aside,
    TopBar
  },

  data() {
    return {
      activeWidth: ''
    }
  },

  computed: {

  },

  watch: {
    /* 监听浏览器宽度，执行回调 */
    activeWidth: {
      /* immediate为true时在1198以上时每次刷新都会调用回调，先赋值为gone后为show */
      /* 关闭后在1198以下，刷新时因为不会先调用，所以，会先完全出现后再调用回调，赋值为gone，使侧离开 */
      // immediate: true,
      handler(newVal) {
        if(newVal < 1198) {
          // console.log('gone')
          document.body.className = 'aside_gone';
        } else {
          // console.log('show')
          document.body.className = '';
        }
      }
    }
  },

  methods: {
    /* 显示导航栏 */
    showMenu() {
      document.body.className = 'aside_show';
    },

    /* body的点击事件 */
    bodyClick() {
      // console.log("bodyclick")
      if(document.body.className == 'aside_show') {
        document.body.className = 'aside_gone';
      } else {
        return;
      }
    },


  },

  mounted() {
    this.activeWidth = document.body.clientWidth;
    /* 当窗口改变时会执行window.onresize() */
    window.onresize = () => {
      return (() => {
        this.activeWidth = document.body.clientWidth;
      })()
    }
    /* 挂载阶段绑定body的点击事件 */
    document.body.addEventListener('click', this.bodyClick)
  },
}
</script>
<style scoped lang="less">
@import '../assets/css/common.less';


.transition-common {
  transition: all 0.5s ease;
}
.home {
  position: relative;
  @media (max-width: 1198px) {

  }
  .aside-left {
    z-index: 800;
    background-color: #fff;
    position: fixed;
    height: 100%;
    left: 0;
    box-shadow: -2px 0 10px 1px rgba(#000, 0.1);
    .transition-common();
    .aside-main {
      width: 200px;
    }
  }
  .nav-top {
    height: 80px;
    box-sizing: border-box;
    background-color: @basecolor;
    .transition-common();
    .menu {
      cursor: pointer;
      position: absolute;
      visibility: hidden;
      color: #fff;
      font-size: 30px;
      top: 22px;
      left: 30px;
      .transition-common();
    }
    @media (max-width: 1198px) {
      .menu {
        visibility: visible;
      }
    }
  }
  .main-container {
    box-sizing: border-box;
    position: relative;
    padding-right: 30px;
    padding-top: 0;
    width: 100%;
    z-index: 1;
    .transition-common();
  }
  .col-main-container-change {
    padding-left: 230px;
  }
  @media (max-width: 1198px) {
    .col-main-container-change {
      padding-left: 30px;
    }
  }
}
body.aside_gone {
  .home {
    .aside-left {
      left: -250px;
    }
  }
}

</style>
