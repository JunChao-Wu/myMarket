<template>
  <div id="List-main">
    <!-- 工具栏开始 -->
    <div class="tools-bar">
      <ul class="tools-main">
        <li class="search-main">
          <div class="search-info">
            <span class="search-i iconfont icon-sousuo" @click="goodsSearch"></span>
            <transition name="search">
              <input type="text" name="serach-name" class="search-input" placeholder="搜索" v-model="goodsSearchName" @keyup.enter="goodsSearch">
            </transition>
          </div>
        </li>
        <li class="btn-main">
          <e-select
            @handlerChoosed="setPurchaseName"
            :placeholder="'请选择商品'"
            :optionList="optionList"
            :initOption="initOption"></e-select>
            <input type="hidden" ref="purchaseName">
            <button class="goods-add-btn" @click="addGoods">添加</button>
        </li>
        <li class="btn-main">
          <div>
            <button class="goods-delete-btn" @click="deleteGoods">删除</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- goods列表主体开始 -->
    <div id="list-main" :key="updateKey">
      <list-table
        class="table_class"
        :dataSource="dataSource"
        :isClearCheckbox="isClearCheckbox"
        @getCheckboxSeletions="getCheckboxSeletions">
        <table-column
          width="5%"
          type="checkbox"
          prop="id"></table-column>
        <table-column
          width="35%"
          label="商品名"
          prop="goods_name"></table-column>
        <table-column
          width="30%"
          label="分类"
          prop="category"></table-column>
        <table-column
          width="30%"
          label="库存"
          prop="stock"></table-column>
        </list-table>
        <pagination
          @current-change="goods_get"
          :total="total"
          :pageSize="pageSize"
          :currentPage="currentPage"></pagination>
    </div>
  </div>
</template>

<script>
import ListTable from './table/ListTable.vue';
import TableColumn from './table/TableColumn';
import Pagination from './pagination/pagination';
import eSelect from './select/select.vue';
export default {
  data() {
    return {
      oldKey: 1,
      updateKey: 1,
      dataSource: [],
      total: 0,
      isClearCheckbox: false,
      optionList: [],
      initOption: {},
      currentPage: 1,
      pageSize: 20,
      goodsSearchName: '',
      selections: []
    }
  },
  computed: {
    initPageObj() {
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        search: ''
      }
    }
  },
  methods: {
    // 获取
    async getPurchaseNameList() {
      let resultList = [];
      await this._axios.post('/purchase/getPurchaseNameList').then(res => {
        res.data.forEach(obj => {
          let tempObj = {};
          tempObj.value = obj.goodName;
          tempObj.label = obj.goodName;
          resultList.push(tempObj);
        })
      })
      this.optionList = resultList;
    },

    // 设置select传递过来的值
    setPurchaseName(value) {
      let ref = {};
      this.$nextTick(function () {
        ref = this.$refs;
        if (value == null) {
          ref["purchaseName"].value = '';
          return;
        }else {
          this.initOption.value = value;
          this.initOption.label = value;
          ref["purchaseName"].value = value;
        }
      })
      
    },

    // 添加
    async addGoods() {
      let goodName = this.$refs["purchaseName"].value;
      if ( !goodName ) {

        return;
      }
      let addObj = {};
      addObj.goodName = goodName;
      await this._axios.post('/goods/addGoods', addObj).then(res => {
        if (res.data.msg == 'add success' || res.data.msg == 'goods is existed') {
          this.initOption = {};
        }
      })
      this.updateKey += 1;
    },

    // 搜索
    async goodsSearch() {
      let getObj = {};
      getObj.currentPage = this.currentPage;
      getObj.pageSize = this.pageSize;
      getObj.search = this.goodsSearchName;
      await this._axios.post('/goods/getGoods', getObj).then(res => {
        console.log(res)
        this.dataSource = res.data;
      })
    },

    // 获取
    goods_get(pageObj) {
      this._axios.post('/goods/getGoods', pageObj).then(res => {
        console.log(res)
        this.dataSource = res.data;
      })

    },

    // 删除
    deleteGoods() {

    },

    // 获取table内传递回来的checkbox选择
    getCheckboxSeletions(seletions) {
      this.seletions = seletions;
    },
    
  },
  components: {
    ListTable,
    TableColumn,
    Pagination,
    eSelect
  },

  created() {
    this.getPurchaseNameList();
    this.goods_get(this.initPageObj);
  },
  beforeUpdate() {
    if (this.oldKey !== this.updateKey) {
      this.goods_get(this.initPageObj);
      this.oldKey = this.updateKey;
    }
  },
}
</script>






<style lang="less" scoped>
@import '../assets/css/common.less';
.table_class {
  min-height: 900px;
}

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
    .goods-add-btn {
      margin-left: 2px;
      font-size: 0.8em;
      border: none;
      border-radius: 3px;
      height: 29px;
      color: #fff;
      background-color: @lightblue;
    }
    .goods-delete-btn {
      display: inline-block;
      color: #fff;
      width: 100px;
      line-height: 30px;
      border: none;
      background-color: rgba(@basered, 0.9);
      border-radius: 20px;
      font-size: 0.9em;
      cursor: pointer;
      margin-left: 4px;
    }
  }
}
</style>