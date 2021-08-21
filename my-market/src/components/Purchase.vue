<template>
  <div id="List-container">
    <transition name="dialog">
      <div id="dialog-main" v-if="dialog_control">
        <span class="iconfont icon-jinggao"></span>
        <span class="dialog-text" ref="dialogText">消息块</span>
      </div>
    </transition>
    <!-- 工具栏开始 -->
    <div class="tools-bar">
      <ul class="tools-main">
        <li class="tools-container">
          <div class="search-info">
            <span class="search-i iconfont icon-sousuo" @click="toSearch"></span>
            <transition name="search">
              <input type="text" name="serach_name" id="search" class="search-input" placeholder="搜索" v-model="searchVal" @keyup.enter="toSearch">
            </transition>
          </div>
        </li>
        <li class="tools-container">
          <div class="btn_origin">
            <button class="btn_add" @click="add_form">添加</button>
          </div>
        </li>
        <li class="tools-container">
          <div class="btn_origin">
            <button class="btn_add" @click="edit_form">修改</button>
          </div>
        </li>
        <li class="tools-container">
          <div class="btn_origin">
            <button class="btn_delete" @click="axios_delete">删除</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- 主体开始 -->
    <div ref="list_main" id="list_main" :class="{list_main_out: form_control}" :key="updateKey">
      <div class="form_container" :class="{form_container_out: form_control}">
        <div class="tittle" v-show="submit_type !== 'edit'"><span class="tit_axis"></span>添加进货</div>
        <div class="tittle" v-show="submit_type == 'edit'"><span class="tit_axis"></span>修改进货</div>
        <!-- 表单区域 -->
        <form>
          <div class="form_frame">
            <div class="input_block">
              <div class="options">进货单号：</div><input type="text" name="batchNumber" autocomplete="off" placeholder="必填" ref="batchNumber">
              <span class="input-warn text-warn warned">必填(数字或英文字母)</span>
            </div>
            <div class="input_block">
              <div class="options">商品名：</div><input type="text" name="goodName" autocomplete="off" placeholder="必填" ref="goodName">
              <span class="input-warn text-warn warned">必填项</span>
            </div>
            <div class="input_block">
              <div class="options">进价(元):</div><input type="text" name="purchasePrice" autocomplete="off" placeholder="必填" ref="purchasePrice">
              <span class="input-warn text-warn warned">必填(数字)</span>
            </div> 
            <div class="input_block">
              <div class="options">进货数量：</div><input type="text" name="purchaseAmount" autocomplete="off" placeholder="必填" ref="purchaseAmount">
              <span class="input-warn text-warn warned">必填(数字)</span>
            </div>
            <div class="input_block">
              <div class="options">分类：</div>
              <e-select
                @handlerChoosed="setCategory"
                :optionList="categoryList"
                :initOption="initOption"></e-select>
              <input type="hidden" name="categoryID" ref="categoryID">
              <span class="input-warn text-warn warned">必填(若暂无分类,则选无分类)</span>
            </div>
            <div class="input_block">
              <div class="options">公司：</div><input type="text" name="bussiness" autocomplete="off" ref="bussiness">
              <!-- <span class="input-warn text-warn warned">请输入正确格式数据</span> -->
            </div>
            <div class="input_block">
              <div class="options">产地：</div><input type="text" name="origin" autocomplete="off" ref="origin">
              <!-- <span class="input-warn text-warn warned">请输入正确格式数据</span> -->
            </div>
            <div class="input_block">
              <div class="options">保质期(天):</div><input type="text" name="shelfLife" autocomplete="off" ref="shelfLife">
              <span class="input-warn text-warn warned">必填(数字)</span>
            </div>
            <div class="input_block">
              <div class="options">生产日期：</div><input type="date" name="productionDate" autocomplete="off" ref="productionDate">
              <span class="input-warn text-warn warned">必填项</span>
            </div>
            <div class="input_block">
              <div class="options">进货日期：</div><input type="date" name="purchaseTime" autocomplete="off" ref="purchaseTime">
              <span class="input-warn text-warn warned">必填项</span>
            </div>
          </div>
          <a class="add_submit" @click="submit_form">提交</a>
        </form>
      </div>
      <!-- 列表主题 -->
      <list-table
        ref="_table"
        class="table-class"
        @getCheckboxSeletions="getCheckboxSeletions"
        :isClearCheckbox="isClearCheckbox"
        :dataSource="dataSource">
        <table-column
          width="5%"
          prop="id"
          type="checkbox">
        </table-column>
        <table-column
          label="进货单号"
          width="10%"
          prop="batchNumber">
        </table-column>
        <table-column
          label="商品名"
          width="10%"
          prop="goodName">
        </table-column>
        <table-column
          label="数量"
          width="10%"
          prop="purchaseAmount">
        </table-column>
        <table-column
          label="进货价"
          width="10%"
          prop="purchasePrice">
        </table-column>
        <table-column
          label="进货日期"
          width="10%"
          prop="purchaseTime">
        </table-column>
        <table-column
          label="分类"
          width="10%"
          prop="categoryName">
        </table-column>
        <table-column
          label="公司"
          width="10%"
          prop="bussiness">
        </table-column>
        <table-column
          label="产地"
          width="10%"
          prop="origin">
        </table-column>
        <table-column
          label="生产日期"
          width="10%"
          prop="productionDate">
        </table-column>
        <table-column
          label="保质期"
          width="5%"
          prop="shelfLife">
        </table-column>
      </list-table>

      <pagination
        class="pagination_bottom"
        @current-change="axios_get"
        :total="total"
        :pageSize="pageSize"
        :currentPage="currentPage">
      </pagination>
    </div>
  </div>
</template>

<script>
import {checkNumber, checkNumberletter} from './util/_util_inputs';

import ListTable from './table/ListTable';
import TableColumn from './table/TableColumn';
import Pagination from './pagination/pagination';
import eSelect from './select/select.vue';
import {deepCloneObject} from './util/util';
export default {
  components: {
    ListTable,
    TableColumn,
    Pagination,
    eSelect
    },
  data() {
    return {
      num: 0,
      // 搜索内容
      searchVal: '',
      // 控制刷新组件
      oldUpdateKey: 0,
      updateKey: 0,
      // 控制表单展开与否
      form_control: false,
      // 控制表单的提交方法
      submit_type: '',
      // 渲染的数据来源
      dataSource: [],
      total: 0,
      // 默认的当前页与页含量
      currentPage: 1,
      pageSize: 20,
      // 接受table组件传递回来的checkbox选择的id
      seletions: [],
      // 用于传递给table组件，来实现从外部清空checkbox的操作
      isClearCheckbox: false,
      // add, edit的错误提醒控制
      dialog_control: false,
      // 分类列表
      categoryList: [
        // {id: 1, name: "食品"},
        // {id: 2, name: "生鲜"},
        // {id: 3, name: "零食"},
        // {id: 4, name: "宠物"},
        // {id: 5, name: "宠物"},
        // {id: 6, name: "宠物"},
        // {id: 7, name: "宠物"},
        // {id: 8, name: "宠物"},
        // {id: 9, name: "宠物"},
        // {id: 10,name: "宠物"},
        // {id: 11,name: "宠物"},
      ],
      initOption: {},
    }
  },
  computed: {
    init_getObj() {
      return {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        search: ''
      }
    }
  },
  watch: {
    searchVal: {
      immediate: false,
      handler(newVal) {
        if ( !newVal ) {
          this.axios_get(this.init_getObj);
        }
      }
    },
    form_control: {
      immediate: false,
      handler(newval) {
        if (!newval) {
          let refs = this.$refs;
          let inputs = ['batchNumber', 'purchasePrice', 'purchaseAmount', 'purchaseTime', 'productionDate', 'shelfLife'];
          inputs.forEach(input => {
            refs[input].parentNode.classList.remove('isWarned');
          })
        }
      }
    },
  },
  methods: {
    /* 分类列表获取 */
    async category_get() {
      await this._axios.post('/category/getCategory').then(res => {
        this.categoryList = res.data;
        this.categoryList.map(obj => {
          obj.name = obj.category_name;
          delete obj.category_name;
        });
      })
    },

    /* 接受eSelect组件传递过来的select选择的id,并设置给相应ref，以便之后的获取操作 */
    setCategory(id) {
      if (id) {
        this.$nextTick(function () {
          let ref = this.$refs
          let categoryID = ref["categoryID"]
          categoryID.value = id;
        })
      }
    },

    /* 搜索方法 */
    toSearch() {
      let search = this.searchVal;
      this.init_getObj.search = search;
      this.axios_get(this.init_getObj);
      this.init_getObj.search = '';
    },

    /* 表单提交操作 */
    submit_form() {
      /* 判断提交类型，调用相应提交方法 */
      // console.log(this.submit_type)
      if (this.submit_type == 'edit') {
        this.axios_edit();
      }else if (this.submit_type == 'add') {
        this.axios_add();
      }else {
        return;
      }
    },

    /* add操作 */
    async add_form() {
      // 懒加载分类列表，值有在点击添加时才判断是否有categoryList,没有则去请求回来
      if (this.categoryList.length <= 0) {
        await this.category_get();
      }

      let refs = this.$refs;
      let inputs = ['batchNumber', 'goodName', 'purchaseTime', 'purchasePrice', 'purchaseAmount', 'categoryID', 'bussiness', 'origin', 'productionDate', 'shelfLife'];
      this.initOption = {};
      if (this.submit_type !== 'add') {
        // 置空所有表单
        this.initOption = {};
        inputs.forEach(item => {
          refs[item].value = '';
        })
      }
      this.form_control = !this.form_control;
      if (this.form_control) {
        this.submit_type = 'add';
      }
    },


    /* edit操作 */
    async edit_form() {
      /* 懒加载分类 */
      if (this.categoryList.length <= 0) {
        await this.category_get();
      }
      /* 先判断单个数据行 */
      /* 将需修改的数据添加至表单内容 */
      /* 展开表单切换，并给提交类型赋edit */
      let option = 'edit';
      let seletion = this.getSeletion(this.seletions, option);
      // console.log(seletion)
      if ( !seletion ) {
        this.dialog_control = true;
        this.form_control = false;
        this.$nextTick(() => {
          this.$refs.dialogText.textContent = '仅允许单个数据行进行编辑操作';
        })
        let _this = this;
        setTimeout(function() {
        _this.dialog_control = false;
        }, 2000)
        return ;
      }

      let refs = this.$refs;
      let inputs = ['batchNumber', 'goodName', 'purchaseTime', 'purchasePrice', 'purchaseAmount', 'categoryID', 'bussiness', 'origin', 'productionDate', 'shelfLife'];

      let selectCategoryName = seletion.categoryName;
      inputs.forEach(item => {
        if (item == 'categoryID') {
          // 向eSelect组件提供初始化选项
          this.categoryList.forEach(categoryObj => {
            if (categoryObj.name == selectCategoryName) {
              this.initOption = categoryObj;
              refs[item].value = categoryObj.id;
              return;
            }
          })
        } else {
          refs[item].value = seletion[item];
        }
      })
      // console.log(this.initOption)
      this.form_control = !this.form_control;
      if (this.form_control) {
        this.submit_type = 'edit';
      }
      if (this.submit_type !== 'edit') {
        // 置空所有表单
        this.initOption = {};
        inputs.forEach(item => {
          refs[item].value = '';
        })
      }
      
    },

    /* 用于接收table传递的seletions，包含选择的checkbox的id */
    getCheckboxSeletions(seletions) {
      this.seletions = seletions;
    },

    /* 仅id数组(delete)，或row对象(edit) */
    getSeletion(seletions, option) {
      option = option || '';
      let resultObj = {};
      if(option == 'delete') {
        return seletions;
      }

      if(option == 'edit') {
        if (seletions.length > 1 || seletions.length <= 0) {
          // console.log(seletions)
          return '';
        }else {
          let id = seletions[0];
          this.dataSource.forEach(dataObj => {
            if(dataObj.id == id) {
              resultObj = deepCloneObject(dataObj);
            }
          })
          return resultObj;
        }
      }
    },

    /* 检查受限表单的值是否正确, 全部正确时函数置false */
    inputsChecked() {
      /* 
        商品名----不为空
        进货单号----任意数字和字母
        进货价----任意数字
        进货数量----任意数字
        分类----不为空
        进货日期----不为空
        生产日期----不为空
        保质期----任意数字
      */
      const refs = this.$refs;
      let inspection_seed = 1;
      let inspectionObj = {};
      const inputs = ['batchNumber', 'purchasePrice', 'purchaseAmount', 'purchaseTime', 'productionDate', 'shelfLife', 'categoryID', 'goodName'];

      // 判断所有受限表单的值并记录结果，不符合的显示错误信息
      inputs.forEach(input => {
        const inspecitonName = 'inspeciton_' + inspection_seed++;
        switch (input) {
          case 'batchNumber' :
            inspectionObj[inspecitonName] = checkNumberletter(refs[input].value);
            break;

          case 'purchasePrice':
          case 'purchaseAmount': 
          case 'shelfLife':
            inspectionObj[inspecitonName] = checkNumber(refs[input].value);
            break;
          
          case 'purchaseTime':
          case 'productionDate':
          case 'goodName':
          case 'categoryID':
            inspectionObj[inspecitonName] = refs[input].value !== '';
            break;
        }
        // 受限表单值不符合规范时，显示错误提示
        if(!inspectionObj[inspecitonName]) {
          refs[input].parentNode.classList.add('isWarned')
        } else if(refs[input].parentNode.className.indexOf('isWarned') != -1){
          refs[input].parentNode.classList.remove('isWarned')
        }
      })
      // 组合判断结果
      let check = true;
      Object.keys(inspectionObj).forEach(key => {
        check = check && inspectionObj[key];
        return check;
      });
      // 返回函数结果
      if(check) {
        return false;
      } else {
        return true;
      }
    },

    /* 删除数据请求 */
    async axios_delete() {
      let option = 'delete';
      let seletions = this.getSeletion(this.seletions, option);

      if( !seletions ) {
        return;
      }
      await this._axios.post('/purchase/deletePurchase', seletions).then(res => {
        if(res.data.msg !== 'delete success') {
          console.log('failed')
        }
        // this.$refs._table.clearCheckbox();
        this.isClearCheckbox = true;
      })
      // 重新获取数据
      this.updateKey += 1;
    },

    /* 修改数据请求 */
    async axios_edit() {
      let option = 'edit';
      let seletion = this.getSeletion(this.seletions, option);
      let id = seletion.id;

      let inputs = ['batchNumber', 'goodName', 'purchaseTime', 'purchasePrice', 'purchaseAmount', 'categoryID', 'bussiness', 'origin', 'productionDate', 'shelfLife'];
      const refs = this.$refs;
      let purchaseObj = inputs.reduce((pre, input) => {
        if(refs[input]) {
          let value =  refs[input].value == '' ? null : refs[input].value;
          pre[input] = value;
        }
        return pre;
      }, {});
      purchaseObj.id = id;
      
     await this._axios.post('/purchase/editPurchase', purchaseObj).then(res => {
        if (res.data.msg !== 'edit success') {
          console.log('failed')
        }
        this.form_control = !this.form_control;
        // this.$refs._table.clearCheckbox();
        this.isClearCheckbox = true;
      })
      // 重新获取数据
      this.updateKey += 1;
    },

    /* 添加进货请求 */
    async axios_add() {
      // 判断如果有表单数据不规范，就返回并终止表单的提交
      if(this.inputsChecked()) {
        return;
      }
      // 获取add_input内的数据
      let inputs = ['batchNumber', 'goodName', 'purchaseTime', 'purchasePrice', 'purchaseAmount', 'categoryID', 'bussiness', 'origin', 'productionDate', 'shelfLife'];
      const refs = this.$refs;
      let addObj = inputs.reduce((pre, input) => {
        if(refs[input]) {
          let value =  refs[input].value == '' ? null : refs[input].value;
          pre[input] = value;
        }
        return pre;
      }, {});

      /* 发送数据并接收返回信息 */
      await this._axios.post('/purchase/addPurchase', addObj).then(res => {
        if (res.data.msg !== 'add success') {
          console.log('failed')
        }
        if(res.data.msg == 'add success') {
          // 清空表单
          inputs.forEach(input => {
            refs[input].value = '';
          })
        }
        this.form_control = !this.form_control;
      })
      // 然后重新获取更新数据
      this.updateKey += 1;
    },

    /* 获取进货单数据请求 */
    axios_get(pageObj) {
      // 当前页，每页数量，是否有搜索并获取其内容一并提交
      const getObj = {};
      pageObj = pageObj || {};
      // if (e.target.className.indexOf('search') != -1) {
      //   getObj.search = e.target.value;
      // }
      getObj.pageObj = pageObj;
      this._axios.post('/purchase/getPurchase', getObj).then(res => {
        this.dataSource = res.data.data;
        this.total = res.data.total;
      })
    }

  },
  created() {
    
  },
  mounted() {
    this.axios_get(this.init_getObj)
  },
  beforeUpdate() {
    if (this.oldUpdateKey != this.updateKey) {
      this.axios_get(this.init_getObj)
      this.oldUpdateKey = this.updateKey;
    }
  },
}
</script>






<style lang="less" scoped>
@import '../assets/css/common.less';
.isWarned {
  .warned {
    visibility: visible !important
  }
}

// 公共类
.transition-common {
  transition: all 0.5s ease;
}
.btn {
  display: inline-block;
  color: #fff;
  width: 100px;
  line-height: 30px;
  border: none;
  background-color: rgba(@lbasecolor, 0.6);
  border-radius: 20px;
  font-size: 0.9em;
  cursor: pointer;
  margin-left: 4px;
}


.table-class {
  min-height: 900px;
}
.pagination_bottom {
  padding-bottom: 20px;
}

#List-container {
  height: 100%;
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
    // flex-wrap: nowrap;
    li {
      padding-left: 10px;
    }
  }
  .tools-container {
    flex: 1;
    line-height: 80px;
  }
  .search-info {
    width: 180px;
    position: relative;
    .search-i {
      cursor: pointer;
      color: @basegray;
      font-size: 24px;
      position: absolute;
      top: 0px;
      left: 8px;
    }
  }
  @media (max-width: 380px) {
    .search-input {
      width: 100%;
    }  
  }
  .search-input {
    width: 100%;
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
  .btn_origin {
    display: inline-block;
    .btn_add {
      .btn();
    }
    .btn_delete {
      .btn();
      background-color: rgba(@basered, 0.9);
    }
  }  
}

#list_main {
  position: relative;
  overflow: hidden;
  .transition-common();
  .form_container {
    .transition-common();
    position: absolute;
    top: -675px;
    // background-color: rgba(@lbasecolor, 0.2);
    // border-bottom: 2px solid rgba(@lbasecolor, 0.2);
    // padding-bottom: 20px;
    .tittle {
      text-align: left;
      padding: 10px 0 10px 20px;
      font-size: 24px;
      .tit_axis {
        display: inline-block;
        height: 20px;
        width: 2px;
        background-color: rgba(@lbasecolor, 0.6);
        margin-right: 20px;
      }
    }
    .form_frame {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .input_block {
        position: relative;
        line-height: 30px;
        font-size: 16px;
        padding: 10px 0 10px 20px;
        .options {
          display: inline-block;
          width: 80px;
          text-align: left;
        }
        .input-warn {
          visibility: hidden;
          position: absolute;
          bottom: -14px;
          left: 100px;
        }   
        input {
          width: 187px;
          box-sizing: border-box;
          border: 1px solid rgba(@basegray, 0.4);
          border-radius: 4px;
          height: 30px;
          padding: 4px 0 4px 10px;
        }
      }
    }
    .add_submit {
      margin-top: 10px;
      .btn();
    }
  }

  /* add_container_out的媒体查询 */
  .form_container_out {
    top: 0;
  }
}

// .list_main_out {
//   padding-top: 602px;
// }

@media (min-width: 651px) {
  .list_main_out {
    padding-top: 343px;
  }
}

@media (min-width: 907px) {
  .list_main_out {
    padding-top: 336px;
  }
}
@media (min-width: 937px) {
  .list_main_out {
    padding-top: 286px;
  }
}
@media (min-width: 1425px) {
  .list_main_out {
     padding-top: 235px;
  }
}
@media (min-width: 1695px) {
  .list_main_out {
    padding-top: 188px;
  }
}


// #dialog-msg
#dialog-main {
  overflow: hidden;
  position: fixed;
  top: 146px;
  left: 0;
  display: flex;
  width: 100%;
  line-height: 40px;
  // height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(@basegray, 0.1);
  .icon-jinggao {
    color: rgba(@basered, 0.8);
    font-size: 1.5em;
    padding-right: 6px;
  }
  .dialog-text {
    font-size: 1em;
    color: rgba(@basered, 0.8);
  }
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.8s ease;
}



</style>