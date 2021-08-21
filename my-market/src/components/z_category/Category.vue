<template>
  <div id="Category-container">
    <!-- 工具栏 -->
    <div class="tools-bar">
      <ul class="tools-main">
        <li class="tools-container">
          <div class="add-input-info">
            <span class="add-i iconfont icon-tianjiashuju" @click="category_add"></span>
            <input type="text" class="add-input" name="category_add" placeholder="添加" v-model="category_name" @keyup.enter="category_add">
          </div>
        </li>
        <li class="tools-container">
          <div class="btn_origin">
            <button class="btn_delete" @click="category_delete">删除</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- 显示所有分类 -->
    <div class="category-main" :key="updateKey">
      <ul class="category-list">
        <li
          v-for="listObj in listData"
          :key="listObj.id"
          class="category-row"
          @click="choosed($event ,listObj.id)">
            {{listObj.category_name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldUpdateKey: 0,
      updateKey: 0,
      category_id: 0,
      category_name: '',
      listData: []
    }
  },
  methods: {
    async category_get() {
      let categoryList = [];
      await this._axios.post('/category/getCategory').then(res => {
        let dataTemp = res.data;
        dataTemp.forEach(obj => {
          if (obj.id !== 1) {
            categoryList.push(obj)
          }
        })
      })
      this.listData = categoryList;
    },

    async category_add() {
      /* 判断添加的内容是否有效 */
      /* 提交内容至后台，返回数据并刷新组件 */
      let addObj = {};
      addObj.name = this.category_name;
      await this._axios.post('/category/addCategory', addObj).then(res => {
        if (res.data.msg == 'add success') {
          this.category_name = '';
        }
      })
      this.updateKey += 1;
    },

    async category_delete() {
      let deleteObj = {};
      deleteObj.id = this.category_id;
      await this._axios.post('/category/deleteCategory', deleteObj);
      this.updateKey += 1;
    },

    choosed(e, id) {
      /* 判断元素是否已经有category-choosed， 有则移除并置category_id为0 */
      if (e.target.className.indexOf('category-choosed') != -1) {
        e.target.classList.remove('category-choosed');
        this.category_id = 0;
        return;
      }
      /* 无则给选定元素添加category-choosed类，并使其他兄弟元素移除category-choosed类 */
      let els = e.target.parentNode.children;
      els.forEach(el => {
        el.classList.remove('category-choosed')
      })
      e.target.classList.add('category-choosed');
      /* 并存储id在category_id，留给删除动作 */
      this.category_id = id;
    }
  },
  mounted() {
    this.category_get();
  },
  beforeUpdate() {
    if (this.oldUpdateKey !== this.updateKey) {
      this.category_get();
      this.oldUpdateKey = this.updateKey;
    }
  },
  
}
</script>


<style lang="less" scoped>
@import '../../assets/css/common.less';
// 组件公共类
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

// 组件内部类
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
  .add-input-info {
    width: 180px;
    position: relative;
    .add-i {
      cursor: pointer;
      color: @basegray;
      font-size: 18px;
      position: absolute;
      top: 0px;
      left: 10px;
    }
    .add-input {
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


.category-main {
  margin-top: 30px;
  .category-list {
    display: flex;
    flex-wrap: wrap;
    .category-row {
      position: relative;
      box-sizing: border-box;
      background-color: #fff;
      cursor: pointer;
      width: 233px;
      padding: 20px 0;
      margin: 10px 10px;
      // border-radius: 0 20px 20px 0;
      border-bottom: 2px solid rgba(@basered, 0.4);
      &:hover {
        border-bottom: 2px solid transparent;
        background-color: transparent;
        // color: #fff;
        &::before {
          height: 100%;
        }
      }
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        // border-radius: 0 20px 20px 0;
        z-index: -1;
        background-color: rgba(@basered, 0.4);
        transition: all 1s ease;
      }
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 0 20px 20px 0;
        z-index: -2;
        background-color: #fff;
      }
    }
  }
}

// 特殊类
#Category-container {
  .category-choosed {
    border-bottom-color: transparent;
    background-color: @lightred !important
  }
}
</style>