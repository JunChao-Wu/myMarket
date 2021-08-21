<template>
  <div id="List-main">
    <!-- 工具栏开始 -->
    <div class="tools-bar">
      <ul class="tools-main">
        <li class="search-main">
          <div class="search-info">
            <span class="search-i iconfont icon-sousuo"></span>
            <transition name="search">
              <input type="text" name="serach-name" id="search" class="search-input" placeholder="搜索">
            </transition>
          </div>
        </li>
        <li class="btn-main">
          <div class="add">
            <button>添加</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- goods列表主体开始 -->
    <div id="list-main">


    </div>
  </div>
</template>

<script>
import Table from './table/ListTable.vue';
import TableColumn from './table/TableColumn';
import Pagination from './pagination/pagination';
export default {
  data() {
    return {
      
    }
  },
  methods: {
    setList: function () {
      
    }
  },
  component: {
    Table,
    Pagination,
    TableColumn
  }
}
</script>






<style lang="less" scoped>
@import '../assets/css/common.less';

@basegray: #6e6d7a;
@lightgray: #e2e2e4;

#List-main {
  .list-row {
    padding-left: 0;
    padding-right: 0;
    div {
      line-height: 40px;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 0.85em;
      &:nth-child(odd) {
        background-color: rgba(@lbasecolor, 0.1);
      }
    }
    .top-tag {
      display: block;
      font-size: 1em;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px @basegray solid;
    }
  }
}
.tools-bar {
  width: 100%;
  height: 80px;
  .tools-main {
    float: right;
    display: flex;
    li {
      margin-left: 20px;
    }
  }
  .search-main {
    flex: 1;
    line-height: 80px;
    width: 100%;
  }
  .search-info {
    position: relative;
    .search-i {
      color: @basegray;
      font-size: 24px;
      position: absolute;
      top: 0px;
      left: 8px;
    }
  }
  .search-input {
    background-color: rgba(@lbasecolor, 0.2);
    box-sizing: border-box;
    line-height: 30px;
    padding: 2px 0 2px 36px;
    border-radius: 33px;
    border: 1px solid transparent;
    transition: all 0.4s ease;
    &:hover {
      background: #fff;
      box-shadow: 0 0 0 4px rgba(@lbasecolor, 0.2);
      border: 1px solid @lightgray;
    }
    &:focus {
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: #fff;
      box-shadow: 0 0 0 4px rgba(@lbasecolor, 0.2);
    }
  }
  .btn-main {
    line-height: 80px;
  }
}
</style>