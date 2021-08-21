<template>
  <div class="top clearfix">
    <ul class="top-nav">
      <li><span class="identity">身份</span></li>
      <li>
        <span class="user-i iconfont icon-user-c"></span>
        <div class="user-setting">
          <ul class="user-setting-main" >
            <span class="xiaosanjiao-i"></span>
            <li class="user-account">
              <a href="#">账号资料</a>
            </li>
            <span class="user-line"></span>
            <li class="logout">
              <a href="#">登出</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
@import '../assets/css/common.less';
// @basecolor: #87ced2;
// @basegray: #6e6d7a;
// @basewarn: #c91623;
// @linecolor: #e4ebeb;
// @lightgray: #e2e2e4;

.horizon {
  display: flex;
  align-items: center;
}

.top {
  box-sizing: border-box;
  height: 80px;
  padding: 10px 30px;
  border-bottom: 1px solid ;
  .top-nav {
    .horizon();
    float: right;
    height: 100%;
    li {
      .identity {
        // 身份
        line-height: 80px;
        color: #fff;
        .no-touch();
      }
      // 个人信息
      position: relative;
      margin-left: 20px;
      &:last-child {
        &:hover .user-setting-main{
          visibility: visible;
        }
      }
      .user-i {
        color: #fff;
        line-height: 80px;
        font-size: 30px;
        // cursor: pointer;
      }
      .user-setting {
        position: absolute;
        top: 60px;
        right: 0;
        .xiaosanjiao-i {
          position: absolute;
          top: -10px;
          right: 15px;
          width: 0px;
          height: 0px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 10px solid #fff;
          // box-shadow: 0 0 10px @basecolor;
        }
        .user-setting-main {
          z-index: 999;
          visibility: hidden;
          padding: 20px 0;
          position: absolute;
          right: -8px;
          top: 10px;
          width: 150px;
          // height: 100px;
          background-color: #fff;
          // border: 1px solid @basegray;
          border-radius: 6px;
          box-shadow: 0 0 50px rgba(@basecolor, 0.5);
          .user-line {
            // text-align: center;
            margin: 4px auto;
            display: block;
            width: 100px;
            height: 1px;
            background-color: rgba(@basegray, 0.3);
          }
          li {
            margin: 0;
            padding-left: 26px;
            text-align: left;
            line-height: 30px;
            &:hover {
              background-color: rgba(@basecolor, 0.1);
            }
            a {
              display: block;
              width: 100%;
              height: 100%;
              color: @basegray;
            }
          }
        }
      }
    }
 }
}
</style>