const BaseDao = require('./baseDao')

class goodsDao extends BaseDao {
  constructor(pool) {
    super(pool)
  }

  // 添加goods
  async addGoods(goodsObj) {
    let sql = "insert into s_goods(goods_name, category_id, stock) values('" + goodsObj.name + "'," + goodsObj.category_id + "," + goodsObj.stock +")";
    console.log(sql)
    let result = await this.querySQL(sql);
    if (result) {
      return true;
    }else {
      return false;
    }
  }


  // 获取goods
  async getGoods(getObj) {
    // getObj = {start, pageSize}
    let search = getObj.search || '';
    let sql = "select * from s_goods ";
    if (search) {
      search = escape(search);
      sql += "where goods_name =" + search + " ";
    }
    sql += "limit " + getObj.start + "," + getObj.pageSize;

    let results = await this.querySQL(sql);

    results.forEach(obj => {
      obj.goods_name = unescape(obj.goods_name)
    })
    return results;
  }


  // async editGoods() {

  // }


  // 删除goods
  async deleteGoods(id) {
    let sql = "delete from s_goods where id = " + id;

    let result = await this.querySQL(sql);
    if (result) {
      return true;
    }else {
      return false;
    }
  }


  // 特定功能性接口
  // 
  async isExistedGoods(name) {
    let sql = "select * from s_goods where goods_name ='"+ name + "'";
    console.log(sql)
    let result = await this.querySQL(sql);
    console.log(result)
    if (result[0]) {
      return true;
    }else {
      return false;
    }
  }

}




module.exports = goodsDao;
